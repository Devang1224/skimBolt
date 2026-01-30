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

  const [isSummaryActive, setIsSummaryActive] = useState(false);
  const [blogSummary, setBlogSummary] = useState("");
  const [blogGlossary, setBlogGlossary] = useState<GlossaryItem[]>([]);
  const [metaData,setMetaData] = useState({});
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
      setMetaData(data?.metadata);
      if (data?.glossary?.length) {
        setBlogGlossary([...data.glossary]);
      }
      setIsSummaryActive(true);

    } catch (err) {
      console.log("error while fetching summary: ", err);
      toast.error("Error while generating summary");
    } finally {
      setIsLoading(false)
    }
  };

  console.log("authToken from chatMain: ", authToken);
  console.log("isSummaryActive?: ",isSummaryActive);
  console.log("isLoading?: ",isLoading);
  // console.log("error",isError)
  return (
    <div className="min-h-[calc(100vh)] bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">
    <Header blogSummary={blogSummary} blogGlossary={blogGlossary}  />
  
    {isSummaryActive ? (
      <SummaryPage blogSummary={blogSummary} blogGlossary={blogGlossary} blogMetaData={metaData} />
    ) : isLoading ? (
      <SummaryLoader />
    ) : (
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-blue-100 p-8 flex flex-col gap-6">
          
          {/* Hero */}
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-blue-600 tracking-tight">
              SkimBolt ⚡
            </h1>
            <p className="mt-2 text-sm text-black/60 leading-relaxed">
              Turn any long article into a crisp, AI-powered summary in seconds.
            </p>
          </div>
  
          <button
            onClick={getSummary}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium
            hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md cursor-pointer"
          >
            Generate Summary
          </button>
  
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-black/10" />
            <span className="text-xs text-black/40 uppercase tracking-wide">
              or
            </span>
            <div className="flex-1 h-px bg-black/10" />
          </div>
  
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-black/70">
              Paste your content
            </label>
            <textarea
              ref={userPastedContent}
              placeholder="Drop the article content here…"
              className="w-full h-28 resize-none rounded-xl border border-black/20 p-3
              text-sm text-black/70 placeholder:text-black/30
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
              transition"
              onKeyUp={(e)=>{
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                   getSummary()
                }
              }}
            />
          </div>
  
          <p className="text-xs text-center text-black/40">
            Works best with articles, blogs, and documentation.
          </p>
        </div>
      </div>
    )}
  </div>
  
  );
};

export default ChatMain;
