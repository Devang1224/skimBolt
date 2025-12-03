import axios from "axios";


export const userApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
})

userApi.interceptors.request.use(async(config)=>{
    return new Promise((resolve)=>{
        chrome.storage.local.get("auth-token", (result) => {
            const token  = result['auth-token'];
            if(token){
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${token}`
            }
            resolve(config);
        })
    })
})