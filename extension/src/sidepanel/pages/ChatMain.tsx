import { useEffect, useState } from "react";
import SummaryPage from "./SummaryPage";
import { fetchSummary } from "../../services/fetchSummary";
import type { GlossaryItem, SummaryResponse } from "../../types";
import Header from "../../components/Header";
import { useSettings } from "../../context/SettingsContext";
import { userApi } from "../../middleware";
import { safeJsonParse } from "../../helpers/helpers";

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
  const {settings} = useSettings();



const fetchCachedSummary = async()=>{
  try{
    setIsLoading(true);
     const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
      const response =  await userApi.post('/summary/check-summary',{url:tab.url});
      const cachedSummary  = safeJsonParse<SummaryResponse>(response.data.summary);
      setBlogSummary(cachedSummary.summary);
      if(cachedSummary?.glossary?.length){
        setBlogGlossary([...cachedSummary.glossary]);
      }
      setIsSummaryActive(true);
      
    console.log("checking cachedsummary:", cachedSummary);

  }catch(err){
    console.log(err);
  }finally{
    setIsLoading(false);
  }
}

useEffect(()=>{
  fetchCachedSummary();
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
      <Header/>
      {isSummaryActive ? (
        <SummaryPage blogSummary={blogSummary} blogGlossary={blogGlossary}/>
      ) : (
          isLoading ? (
            <p>Loading.....</p>
          ) :(
        <div className="flex-col p-2 bg-white flex-1 flex items-center justify-center gap-5 h-full">
          <h1 className="text-2xl font-bold mb-4 text-blue-300">SkimBolt</h1>
          <div className="">
            <button 
              onClick={getSummary} 
              className="px-6 py-3 bg-blue-600  rounded-lg hover:bg-blue-700 transition-colors 
              cursor-pointer font-medium"
            >
              Get Summary
            </button>
          </div>
        </div> )
      )}
    </div>
  );
};

export default ChatMain;
