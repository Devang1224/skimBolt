

chrome.runtime.onInstalled.addListener(({reason})=>{
   if(reason == "install"){
    //todo: add the website url here
    chrome.tabs.create({url:`${import.meta.env.VITE_WEB_URL}/signin`})
   }
})

chrome.action.onClicked.addListener((tab)=>{
 console.log("Extension icon clicked");

  chrome.sidePanel.setOptions({
    tabId: tab.id,
    path: "sidepanel.html",
  });

  chrome.sidePanel.open({ windowId: tab.windowId });
});

// get the active chrome tab
chrome.runtime.onMessage.addListener((msg,_sender,sendResponse)=>{
    if(msg?.type === "GET_ACTIVE_TAB_URL"){
        chrome.tabs.query({
            active:true,
            currentWindow:true,
        },(tabs)=>{
            sendResponse({url: tabs[0]?.url || ""})
        })
        return true;
    }else if(msg?.type === "STORE_JWT"){
        console.log("message token",msg.token);        
    }
});

// get token from the cookie
// chrome.cookies.get({url: "http://localhost:3000",name:'auth-token'},(cookie)=>{
//     console.log("cookie: ",cookie);
// });