
const BASE_URL =  "http://localhost:3000";

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

