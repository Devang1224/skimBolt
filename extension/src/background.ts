import { validateToken } from "./helpers/validateToken";


chrome.runtime.onInstalled.addListener(({reason})=>{
   if(reason == "install"){
    console.log("First Install: Opening the signin page");
    chrome.tabs.create({url:`${import.meta.env.VITE_WEB_URL}/signin`})
   }
});



chrome.action.onClicked.addListener((tab)=>{
    
  if(tab.id){
    chrome.sidePanel.setOptions({
      tabId:tab.id,
      path:"sidepanel.html"
    });
    chrome.sidePanel.open({
      windowId:tab.windowId
    })
  }
})



// chrome.runtime.onMessage.addListener((message,_sender,sendResponse) => {
//   console.log("listener is listening");
//  if(message.action === 'fetchAuthToken'){
//    console.log("checking localstorage of extension");
//     chrome.storage.local.get("auth-token", (result) => {
//      if (result["auth-token"]) {
//        console.log("Token is stored in the extension");
//         console.log("Checking Token validity");
//         const isValid = await validateToken(result["auth-token"]);

//         if (isValid) {
//           sendResponse({ "auth-token": result["auth-token"] });
//         } else {
//           chrome.storage.local.remove("auth-token");
//           chrome.tabs.create({ url: `${WEB_URL}/signin` });
//           sendResponse(false);
//         }
//        sendResponse({"auth-token":result["auth-token"]});
//      } else {
//          console.log("No Token found in the extension");
//          console.log("Extracting cookie from the site");
//          chrome.cookies.get({ url: import.meta.env.VITE_WEB_URL, name: "auth-token"},
//           (cookie) => {
//            if (cookie) {
//              console.log("Extracted Cookie", cookie.value);
//              chrome.storage.local.set({"auth-token": cookie.value});
//              sendResponse({"auth-token" : cookie.value});
//              // chrome.sidePanel.setOptions({tabId: tab.id,path: "sidepanel.html"});
//              // chrome.sidePanel.open({windowId: tab.windowId});
//            } else {
//              console.log("No Cookie found in the site asking the user to signing");
//              chrome.tabs.create({url: `${import.meta.env.VITE_WEB_URL}/signin`});
//              sendResponse(false);
//            }
//          });
       
//      }
//    });
//    return true;
//  }else{
//   console.log("invalid message");
//   sendResponse(false);
//  }

// });
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action !== "fetchAuthToken") {
    sendResponse(false);
    return;
  }

  (async () => {
    try {
      console.log("checking token in extension");
      const { ["auth-token"]: storedToken } =
        await chrome.storage.local.get("auth-token");

      if (storedToken && (await validateToken(storedToken))) {
      console.log("Token valiated");
        sendResponse({ status: "AUTHENTICATED", token: storedToken });
        return;
      }
      console.log("Token not found in the extension");

      // await chrome.storage.local.remove("auth-token");
      console.log("Grabbing token from website cookies");
   
      const cookie = await chrome.cookies.get({
        url: import.meta.env.VITE_WEB_URL,
        name: "auth-token",
      });

      if (cookie?.value) {
      console.log("Token foundin the cookie");
        await chrome.storage.local.set({ "auth-token": cookie.value });
        sendResponse({ status: "AUTHENTICATED", token: cookie.value });
        return;
      }
      console.log("TOken not found in the cookie");

      sendResponse({ status: "UNAUTHENTICATED" });
    } catch (err) {
      console.error(err);
      sendResponse({ status: "ERROR" });
    }
  })();

  return true;
});



chrome.runtime.onMessageExternal.addListener((msg,_sender,sendResponse)=>{
    if(msg.action === "TOKEN_FROM_WEBSITE"){
          console.log("Recieved token from the website:", msg.token);
          chrome.storage.local.set({"auth-token":msg.token});
          sendResponse({ok:true});
    }
});

chrome.runtime.onMessageExternal.addListener((msg,_sender,sendResponse)=>{
    if(msg.type === "SIGNOUT_FROM_WEBSITE"){
          console.log("signing out");
          chrome.storage.local.remove("auth-token", () => {
              console.log("auth-token removed");
            });
          sendResponse({ok:true});
    }
});

// manually reinject script on SPA navigation
// chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
//   chrome.scripting.executeScript({
//     target: { tabId: details.tabId },
//     files: ["src/content.ts"]
//   });
// });



 

