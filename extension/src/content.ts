
// const BASE_URL =  "http://localhost:3000";

import { Readability } from "@mozilla/readability";

console.log("CONTENT SCRIPT INJECTED");
// (function extractTokenFromWebsite(){
//    try{
//         const match = document.cookie.match(/auth-token=([^;]+)/);
//         const token = match ? match[1] : null;
//         if(token){
//             chrome.runtime.sendMessage({
//                 type:"TOKEN_FROM_SITE",
//                 token
//             })
//         }else{
//             chrome.tabs.create({url:`${BASE_URL}/sigin`});
//         }

//    }catch(err){
//     console.error("Error extracting token: ",err);
//    }       
//  }
// )();


// function extractTextContent() {
//   console.log("get summary function called");

//   const documentClone = document.cloneNode(true) as Document;

//   const article = new Readability(documentClone).parse();

//   if (!article || !article.textContent) {
//     console.warn("Readability failed, falling back");
//     return document.body.innerText;
//   }

//   console.log("ARTICLE LENGTH:", article.textContent.length);
//   return article.textContent;
// }

function extractTextContent(){ 
  console.log("get summary function called"); 

  if (window.top !== window) {
    console.warn("Skipping iframe");
    return null;
  }

  if (document.body.innerText.length < 200) {
    console.warn("DOM not ready");
    return null;
  }



  const doc = document.implementation.createHTMLDocument(); 
  console.log("document innertext", document.body.innerText  );
  doc.documentElement.innerHTML = document.documentElement.outerHTML; 
  const article = new Readability(doc).parse()?.textContent; 
  console.log("ARTICLE: ",article); 
  return article; 
}

chrome.runtime.onMessage.addListener((msg,_sender,sendResponse)=>{ 
    if(msg.action === "GET_TEXTCONTENT"){
        console.log("get summary action triggered");
        const article = extractTextContent();

      if (!article) {
        sendResponse({ error: "NO_ARTICLE" });
        return true;
      }

      sendResponse({ article });
      return true;
    }
})

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === "PING_CONTENT_SCRIPT") {
    sendResponse({ injected: true });
  }
});
