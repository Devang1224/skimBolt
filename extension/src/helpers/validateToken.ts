import toast from "react-hot-toast";
import { clearAuthToken } from "./helpers";
import axios from "axios";

export const validateToken = async (token:string)=>{
    try{
        if(!token){
            return;
        }
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/validateAuthToken`,{},{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });
        const resBody = res.data;
        console.log("validateToken response",resBody);
      
        return true;

    }catch(err:any){
      console.log("Error while validating token",err);

      if(err.response?.data?.code=='ERR_JWT_EXPIRED'){
        console.log("Expired Token Detected");
        setTimeout(()=>{
            toast.error("Session is expired. Please Relogin");
        },1000)
        console.log('clearing token from site and extension');
        await clearAuthToken();
        // redirectToLogin();
    }

      return false;
    }
};