import { useState } from "react";
import SummaryPage from "./SummaryPage";
import { fetchSummary } from "../../services/fetchSummary";

interface ChatMainTypes {
  authToken: string;
}
interface TextContentResponse {
  article: string;
}

const ChatMain = ({ authToken }: ChatMainTypes) => {
  const [isSummaryActive, setIsSummaryActive] = useState(false);
  const [blogSummary,setBlogSummary] = useState("");



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
      setIsSummaryActive(true);

    }catch(err){
      console.log("error while fetching summary: ",err);
    }
  };

  console.log("authToken from chatMain: ", authToken);
  return (
    <div>
      {isSummaryActive ? (
        <SummaryPage blogSummary={blogSummary}/>
      ) : (
        <div>
          <h1>SkimBolt</h1>
          <button onClick={getSummary} className="mt-4">
            Get Summary
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatMain;
