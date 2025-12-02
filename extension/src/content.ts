
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


function extractTextContent(){
  console.log("get summary function called");
 
  const doc = document.implementation.createHTMLDocument();
  doc.documentElement.innerHTML = document.documentElement.outerHTML;
  const article = new Readability(doc).parse()?.textContent;
  console.log("ARTICLE: ",article)
  return article;
}


chrome.runtime.onMessage.addListener((msg,_sender,sendResponse)=>{ 
    if(msg.action === "GET_TEXTCONTENT"){
        console.log("get summary action triggered");
        const article = extractTextContent();
        sendResponse({article});
    }
})

