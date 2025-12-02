import axios from "axios";

let authToken = "";

 chrome.storage.local.get("auth-token", (result) => {
    if (result["auth-token"]) {
        authToken = result["auth-token"];
      console.log("Token is stored in the extension");
    }
})

export const userApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        "Authorization": `Bearer ${authToken}`
    }
})