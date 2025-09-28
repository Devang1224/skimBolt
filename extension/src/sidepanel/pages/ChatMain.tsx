import { useState } from "react";
import SummaryPage from "./SummaryPage";

interface ChatMainTypes {
  authToken: string;
}

const ChatMain = ({ authToken }: ChatMainTypes) => {
  const [isSummaryActive, setIsSummaryActive] = useState(true);

  const getSummary = async () => {
    console.log("get summary btn pressed");
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    //  await chrome.scripting.executeScript({
    //   target: { tabId: tab.id! },
    //   files: ["content.js"],
    // });
    chrome.tabs.sendMessage(tab.id!, { action: "GET_TEXTCONTENT" });
    setIsSummaryActive(true);
  };

  console.log("authToken from chatMain: ", authToken);
  return (
    <div>
      {isSummaryActive ? (
        <SummaryPage/>
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
