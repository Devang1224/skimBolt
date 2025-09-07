
interface ChatMainTypes {
 authToken:string
}

const ChatMain = ({
    authToken
}:ChatMainTypes) => {

const getSummary = async ()=>{
  console.log("get summary btn pressed");
  const [tab] = await chrome.tabs.query({active:true,currentWindow:true});
  //  await chrome.scripting.executeScript({
  //   target: { tabId: tab.id! },
  //   files: ["content.js"], 
  // });
  chrome.tabs.sendMessage(tab.id!,{action:"GET_TEXTCONTENT"});
}

    console.log("authToken from chatMain: ",authToken);
  return (
    <div>
      <h1>SkimBolt</h1>
      <button onClick={getSummary}>
        Get Summary
      </button>
    </div>
  )
}

export default ChatMain