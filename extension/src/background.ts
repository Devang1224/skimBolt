

chrome.runtime.onInstalled.addListener(({reason})=>{
   if(reason == "install"){
    console.log("First Install: Opening the signin page");
    chrome.tabs.create({url:`${import.meta.env.VITE_WEB_URL}/signin`})
   }
});

chrome.action.onClicked.addListener(async (tab) => {

 chrome.storage.local.get("auth-token", (result) => {
  if (result["auth-token"]) {
    console.log("Token is stored in the extension");
    chrome.sidePanel.setOptions({
      tabId: tab.id,
      path: "sidepanel.html",
    });
    chrome.sidePanel.open({
      windowId: tab.windowId
    });
  } else {
    console.log("No Token found in the extension");
    if (tab?.id) {
      console.log("Extracting cookie from the site");
      chrome.cookies.get({ url: import.meta.env.VITE_WEB_URL, name: "auth-token"},
       (cookie) => {
        if (cookie) {
          console.log("Extracted Cookie", cookie.value);
          chrome.storage.local.set({"auth-token": cookie.value});
          chrome.sidePanel.setOptions({tabId: tab.id,path: "sidepanel.html"});
          chrome.sidePanel.open({windowId: tab.windowId});
        } else {
          console.log("No Cookie found in the site asking the user to signing");
          chrome.tabs.create({url: `${import.meta.env.VITE_WEB_URL}/signin`});
        }
      });
    }
  }
});

});


chrome.runtime.onMessageExternal.addListener((msg,_sender,sendResponse)=>{
    if(msg.type === "TOKEN_FROM_WEBSITE"){
          console.log("Got token from website in background.ts:", msg.token);
          chrome.storage.local.set({"auth-token":msg.token});
          sendResponse({ok:true});
    }

})

chrome.runtime.onMessageExternal.addListener((msg,_sender,sendResponse)=>{
    if(msg.type === "SIGNOUT_FROM_WEBSITE"){
          console.log("signing out");
          chrome.storage.local.remove("auth-token", () => {
              console.log("auth-token removed");
            });
          sendResponse({ok:true});
    }
})
 //auth flow



 

// get the active chrome tab
// chrome.runtime.onMessage.addListener((msg,_sender,sendResponse)=>{
//     if(msg?.type === "GET_ACTIVE_TAB_URL"){
//         chrome.tabs.query({
//             active:true,
//             currentWindow:true,
//         },(tabs)=>{
//             sendResponse({url: tabs[0]?.url || ""})
//         })
//         return true;
//     }else if(msg?.type === "STORE_JWT"){
//         console.log("message token",msg.token);        
//     }
// });

// get token from the cookie
// chrome.cookies.get({url: "http://localhost:3000",name:'auth-token'},(cookie)=>{
//     console.log("cookie: ",cookie);
// });