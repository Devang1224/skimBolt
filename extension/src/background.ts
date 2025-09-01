

chrome.runtime.onInstalled.addListener(({reason})=>{
   if(reason == "install"){
    console.log("First Install: Opening the signin page");
    chrome.tabs.create({url:`${import.meta.env.VITE_WEB_URL}/signin`})
   }
})

chrome.action.onClicked.addListener((tab)=>{
 console.log("Extension icon clicked");

 chrome.storage.local.get("userDetails",(result)=>{
     if(result?.userDetails?.auth_token){
       console.log("Token is stored in the extension");
         chrome.sidePanel.setOptions({
           tabId: tab.id,
           path: "sidepanel.html",
         });
         chrome.sidePanel.open({ windowId: tab.windowId });

     }else{
       console.log("No Token found in the extension");
        if(tab?.id){
       console.log("Extracting cookie from the site");
          chrome.cookies.get({ url: `${import.meta.env.VITE_WEB_URL}`, name: "auth-token" }, (cookie) => {
            if (cookie) {
                console.log("Extracted Cookie", cookie.value);
            } else {
                console.log("No Cookie found in the site asking the user to signing");
                    chrome.tabs.create({url:`${import.meta.env.VITE_WEB_URL}/signin`})
            }
           });
         }
      }
 });

});

chrome.runtime.onMessageExternal.addListener((msg,sender,sendResponse)=>{
    if(msg.type === "TOKEN_FROM_WEBSITE"){
          console.log("Got token from website in background.ts:", msg.token);
          chrome.storage.local.set({userDetails:{auth_token:msg.token}});
          sendResponse({ok:true});
    }

})


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