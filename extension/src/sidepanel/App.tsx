
import { useEffect, useState } from 'react';
import './App.css'
import ChatMain from './pages/ChatMain';
import { redirectToLogin } from '../helpers/helpers';

function App() {
  
  // =======================================================================
  // TODO: Change the externally_connectable to your prod url when deploying
  // =======================================================================


const [authToken,setAuthToken] = useState("");


const getStoredToken = async ()=>{
  try{
     const storedUserDetails = await chrome.storage.local.get('userDetails');
     console.log("storedUserDetails: ",storedUserDetails?.userDetails);
     if(storedUserDetails?.userDetails?.auth_token){
      setAuthToken(storedUserDetails.userDetails.auth_token);
     }else{
        // const token = await getAuthToken();
        // console.log("fetchedToken: ",token);
    console.log("Error: NO TOKEN");
        // setAuthToken(token);
     }
  }catch(err){
    console.log("err",err);
  }
}

useEffect(()=>{
  getStoredToken()
  },[])


// const getAuthToken = async ()=>{
//   try{
    
//   } catch(err){
//     console.log("Login error: ", err);
//     redirectToLogin();
//   } 
// }

return (

 <div className="p-5 bg-red-500">
  {
    authToken ? (
      <ChatMain authToken={authToken}/>
    ):(
    <div>
      <h1>Hello World 🚀</h1>
      <p>This is a Chrome Extension built with CRXJS + Vite + React.</p>
      <div>
        <button onClick={getAuthToken}>
          <p>Login</p>
        </button>
      </div>
      </div>
    )
  }
    </div>
  )
}

export default App
