import { useEffect, useState } from "react";
import SummaryPage from "./SummaryPage";
import { fetchSummary } from "../../services/fetchSummary";
import type { GlossaryItem } from "../../types";
import Header from "../../components/Header";
import { useSettings } from "../../context/SettingsContext";

interface ChatMainTypes {
  authToken: string;
}
interface TextContentResponse {
  article: string;
}

const ChatMain = ({ authToken }: ChatMainTypes) => {

  const [isSummaryActive, setIsSummaryActive] = useState(false);
  const [blogSummary,setBlogSummary] = useState("");
  const [blogGlossary,setBlogGlossary] = useState<GlossaryItem[]>([]);
  const [isLoading,setIsLoading] = useState(false);
  const [isError,setIsError] = useState("");
  // const [isSavedSummary,setIsSavedSummary] = useState(false);
  const [contentScriptInjected,setContentScriptInjected] = useState(false);
  const {settings} = useSettings();


  function checkContentScript(tabId:number | undefined) {
    if(!tabId)return;
    return new Promise((resolve) => {
      chrome.tabs.sendMessage(
        tabId,
        { type: "PING_CONTENT_SCRIPT" },
        (response: { injected?: boolean } | undefined) => {
          if (chrome.runtime.lastError) {
            resolve(false);
          } else {
            resolve(response?.injected === true);
          }
        }
      );
    });
  }


const isContentScriptInjected = async()=>{
  try{
   console.log("checking for contest script")
    
    setIsLoading(true);
     const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

      const isContentScriptInjected = await checkContentScript(tab.id);
      if(!isContentScriptInjected){
        setContentScriptInjected(false);
        console.log("Content script is not injected");
      }else{
        setContentScriptInjected(true);
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
      


  }catch(err){
    console.log("Error while fetching cached summary",err);
  }finally{
    setIsLoading(false);
  }
}

useEffect(()=>{
  const check = async () => {
    await isContentScriptInjected();
  };
  check(); // when user switches tabs

  const onUpdated = (
    _tabId: number,
    changeInfo:chrome.tabs.OnUpdatedInfo
  )=>{
    if(changeInfo?.status === 'complete'){
      check();
    }
  };
  chrome.tabs.onUpdated.addListener(onUpdated); // when new tab is loaded

   return ()=>{
    chrome.tabs.onActivated.removeListener(check);
    chrome.tabs.onUpdated.removeListener(onUpdated);
   }
},[])


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

  const getSummary = async () => {
    try{
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
      const textContent = await getTextContent(tab.id!) as TextContentResponse;
      if (!textContent?.article) {
        setIsError("Got no content maybe site is blocking. Try to copy paste the content below")
        throw new Error("Content script returned empty article");
      }
      setIsLoading(true)
      const data = await fetchSummary(textContent.article, tab.url,settings);
      if (!data?.summary) {
        throw new Error("API response missing summary field");
      }
      console.log("fetched summary: ",data);
      setBlogSummary(data.summary);
      if(data?.glossary?.length){
        setBlogGlossary([...data.glossary]);
      }
      setIsSummaryActive(true);

    }catch(err){
      console.log("error while fetching summary: ",err);
    }finally{
      setIsLoading(false)
    }
  };

  console.log("authToken from chatMain: ", authToken);
  return (
    <div className="h-[calc(100vh-43px)]">
      <Header blogSummary={blogSummary} blogGlossary={blogGlossary}/>
      {isSummaryActive ? (
        <SummaryPage blogSummary={blogSummary} blogGlossary={blogGlossary}/>
      ) : (
          isLoading ? (
            <p>Loading.....</p>
          ):(
        <div className="flex-col p-2 bg-white flex-1 flex items-center justify-center gap-5 h-full">
          <h1 className="text-2xl font-bold mb-4 text-blue-300">SkimBolt</h1>
          <div>
            {
              !contentScriptInjected && <p className="text-red-500">Content script is not injected you have to paste your content below</p>
            }
          </div>
          <div className="">
            <button onClick={getSummary} className="px-6 py-3 bg-blue-600  rounded-lg hover:bg-blue-700 transition-colors 
              cursor-pointer font-medium"
            >
              Get Summary
            </button>
          </div>
          <div className="">
            <button className="px-6 py-3 bg-blue-600  rounded-lg hover:bg-blue-700 transition-colors 
              cursor-pointer font-medium"
            >
              or copy paste text
            </button>
          </div>
        </div> )
      )}
    </div>
  );
};

export default ChatMain;
