import { useEffect, useRef, useState } from "react";
import SummaryPage from "./SummaryPage";
import { fetchSummary } from "../../services/fetchSummary";
import type { GlossaryItem } from "../../types";
import Header from "../../components/Header";
import { useSettings } from "../../context/SettingsContext";
import toast from "react-hot-toast";
import SummaryLoader from "../../components/ui/SummaryLoader";
import { checkContentScript } from "../../helpers/helpers";

interface ChatMainTypes {
  authToken: string;
}
interface TextContentResponse {
  article: string;
}

const ChatMain = ({ authToken }: ChatMainTypes) => {

  const [isSummaryActive, setIsSummaryActive] = useState(true);
  const [blogSummary, setBlogSummary] = useState("");
  const [blogGlossary, setBlogGlossary] = useState<GlossaryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [isError,setIsError] = useState("");
  // const [isSavedSummary,setIsSavedSummary] = useState(false);
  const { settings } = useSettings();
  const userPastedContent = useRef<HTMLTextAreaElement | null>(null);




  const isContentScriptInjected = async () => {
    try {
      console.log("checking for contest script")

      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      const isContentScriptInjected = await checkContentScript(tab.id);
      if (!isContentScriptInjected) {
        console.log("Content script is not injected");
      } else {
        console.log("Content script is injected");
      }
      // const response =  await userApi.post('/summary/check-summary',{url:tab.url});
      // if(response.data.summary){

      //   const cachedSummary  = safeJsonParse<SummaryResponse>(response.data.summary);
      //   setBlogSummary(cachedSummary.summary);
      //   if(cachedSummary?.glossary?.length){
      //     setBlogGlossary([...cachedSummary.glossary]);
      //   }
      //   setIsSummaryActive(true);
      //   setIsSavedSummary(true);
      // }

    } catch (err) {
      console.log("Error while fetching cached summary", err);
    } 
  }

  useEffect(() => {
    const check = async () => {
      await isContentScriptInjected();
    };
    check(); // when user switches tabs

    const onUpdated = (
      _tabId: number,
      changeInfo: chrome.tabs.OnUpdatedInfo
    ) => {
      if (changeInfo?.status === 'complete') {
        check();
      }
    };
    chrome.tabs.onUpdated.addListener(onUpdated); // when new tab is loaded

    return () => {
      chrome.tabs.onActivated.removeListener(check);
      chrome.tabs.onUpdated.removeListener(onUpdated);
    }
  }, [])


  const getTextContent = (tabId: number) => {
    return new Promise((resolve) => {
      chrome.tabs.sendMessage(
        tabId,
        { action: "GET_TEXTCONTENT" },
        (response) => {
          console.log("response from content script: ", response);
          resolve(response);
        }
      );
    });
  }

  const validateTextContent = (textContent: TextContentResponse) => {
    if (!textContent?.article) {
      toast.error("We couldn't read the article from this page. Some websites block extensions — please copy-paste the content below.");
      throw new Error("Content script returned empty article");
    }
    const wordCount = textContent.article.trim().split(" ").length;
    if (wordCount < 120) {
      toast.error("We couldn't read the article from this page. Some websites block extensions — please copy-paste the content below.");
      throw new Error("Article too short to summarize");
    }
    return textContent;
  };

  const getSummary = async () => {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (!tab?.id) {
        throw new Error("Active tab not found");
      }
      if (!tab.url) {
        throw new Error("Tab URL not found");
      }
      console.log("USER PASTED CONTENT______",userPastedContent?.current?.value);
      let textContent = null;
      if (userPastedContent.current?.value == '') {
        textContent = await getTextContent(tab.id!) as TextContentResponse;
        validateTextContent(textContent);
      } else {
        const articleContent = userPastedContent.current?.value || "";
        if(articleContent.split(" ")?.length < 120){
          toast.error("Article is too short to summarize");
          throw new Error("Article is too short to summarize");
        }
        textContent = {
          article: articleContent,
        }
      }

      setIsLoading(true)
      const data = await fetchSummary(textContent.article, tab.url, settings);
      if (!data?.summary) {
        throw new Error("API response missing summary field");
      }
      console.log("fetched summary: ", data);
      setBlogSummary(data.summary);
      if (data?.glossary?.length) {
        setBlogGlossary([...data.glossary]);
      }
      setIsSummaryActive(true);

    } catch (err) {
      console.log("error while fetching summary: ", err);
    } finally {
      setIsLoading(false)
    }
  };

  console.log("authToken from chatMain: ", authToken);
  console.log("isSummaryActive?: ",isSummaryActive);
  console.log("isLoading?: ",isLoading);
  // console.log("error",isError)
  return (
    <div className="h-[calc(100vh-43px)]">
      <Header blogSummary={blogSummary} blogGlossary={blogGlossary} />
      {isSummaryActive ? (
        <SummaryPage blogSummary={blogSummary} blogGlossary={blogGlossary} />
      ) : (
        isLoading ? (
          <SummaryLoader/>
        ) : (
          <div className="flex-col p-2 bg-white flex-1 flex items-center justify-center gap-5 h-full">
            <h1 className="text-2xl font-bold mb-4 text-blue-300">SkimBolt</h1>
            <div className="">
              <button onClick={getSummary} className="px-6 py-3 bg-blue-600  rounded-lg hover:bg-blue-700 transition-colors 
              cursor-pointer font-medium"
              >
                Get Summary
              </button>
            </div>
            <div className="">
              <p className="text-center text-sm text-black/60">
                or copy paste content here
              </p>
              <textarea placeholder="Drop the content here..." ref={userPastedContent}
               className="text-black/60 border border-black/60 mt-10 p-2 h-[10vh] w-[50vw]"
              >
              </textarea>
            </div>
          </div>)
      )}
    </div>
  );
};

export default ChatMain;
