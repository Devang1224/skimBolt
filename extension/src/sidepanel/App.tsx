
import { useEffect, useState } from 'react';
import './App.css'
import ChatMain from './pages/ChatMain';

function App() {
  
  // =======================================================================
  // TODO: Change the externally_connectable to your prod url when deploying
  // =======================================================================


const [authToken,setAuthToken] = useState("");


const getStoredToken = async ()=>{
  try{
     const storedUserDetails = await chrome.storage.local.get('auth-token');
     console.log("storedUserDetails: ",storedUserDetails["auth-token"]);
     if(storedUserDetails["auth-token"]){
      setAuthToken(storedUserDetails["auth-token"]);
     }else{
      console.log("error no token");
     }
  }catch(err){
    console.log("err",err);
  }
}

useEffect(()=>{
  getStoredToken()
  
  const listener = (changes: any, area: string) => {
    if (area === "local" && changes["auth-token"]) {
      setAuthToken(changes["auth-token"].newValue || "");
    }
  };
  chrome.storage.onChanged.addListener(listener);
  return () => chrome.storage.onChanged.removeListener(listener);
  },[])


// const getAuthToken = async ()=>{
//   try{
    
//   } catch(err){
//     console.log("Login error: ", err);
//     redirectToLogin();
//   } 
// }

return (

 <div className="p-5">
  {
    authToken ? (
      <ChatMain authToken={authToken}/>
    ):(
    <div>
      <h1>LOGIN 🚀</h1>
      <p>This is a Chrome Extension built with CRXJS + Vite + React.</p>
      </div>
    )
  }
    </div>
  )
}

export default App
