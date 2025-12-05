import { useState } from "react";
import SummaryPage from "./SummaryPage";
import { fetchSummary } from "../../services/fetchSummary";
import type { GlossaryItem } from "../../types";

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
      })
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


      const data = await fetchSummary(textContent.article, tab.url);
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
    }
  };

  console.log("authToken from chatMain: ", authToken);
  return (
    <div>
      {isSummaryActive ? (
        <SummaryPage blogSummary={blogSummary} blogGlossary={blogGlossary}/>
      ) : (
        <div className="flex flex-col h-full p-2">
          <h1 className="text-2xl font-bold mb-4">SkimBolt</h1>
          <div className="flex-1 flex items-center justify-center">
            <button 
              onClick={getSummary} 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors 
              cursor-pointer font-medium"
            >
              Get Summary
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMain;
