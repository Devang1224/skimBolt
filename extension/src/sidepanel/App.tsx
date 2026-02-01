import { useEffect, useState } from "react";
import "./App.css";
import ChatMain from "./pages/ChatMain";
import toast from "react-hot-toast";
import Login from "../components/Login";

function App() {

  const [authToken, setAuthToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getStoredToken = () => {
    console.log("calling the listener");
    setIsLoading(true);
    chrome.runtime.sendMessage({ action: "fetchAuthToken" }, (response) => {
      if (!response) {
        console.log("found no response from fetchauthtoken");
        setIsLoading(false);
        return;
      }
      if (response.status === "UNAUTHENTICATED") {
           toast.error("Session is expired. Please Relogin");
          setAuthToken("");
          setIsLoading(false);
      }

      if (response.status === "AUTHENTICATED") {
        console.log("Auth token has been authenticated");
        setAuthToken(response.token);
        setIsLoading(false);

      }
    });
  };

  useEffect(() => {
    getStoredToken();

    const listener = (changes: any, area: string) => {
      if (area === "local" && changes["auth-token"]) {
        console.log("auth-token changed", changes["auth-token"].newValue);
        setAuthToken(changes["auth-token"].newValue || "");
      }
    };
    chrome.storage.onChanged.addListener(listener);
    return () => chrome.storage.onChanged.removeListener(listener);
  }, []);

  return (
    <div className="h-full">
      {authToken ? (
        <ChatMain authToken={authToken} />
      ) : (
       <Login isLoading={isLoading}/>
      )}
    </div>
  );
}

export default App;
