import { useEffect, useState } from "react";
import "./App.css";
import ChatMain from "./pages/ChatMain";

function App() {
  // =======================================================================
  // TODO: Change the externally_connectable to your prod url when deploying
  // =======================================================================

  const [authToken, setAuthToken] = useState("");

  const getStoredToken = () => {
    console.log("calling the listener");
    chrome.runtime.sendMessage({ action: "fetchAuthToken" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Message error:", chrome.runtime.lastError);
        return;
      }
      console.log("storedUserDetails:", response);
      setAuthToken(response["auth-token"]);
    });
  };

  useEffect(() => {
    getStoredToken();

    const listener = (changes: any, area: string) => {
      if (area === "local" && changes["auth-token"]) {
        setAuthToken(changes["auth-token"].newValue || "");
      }
    };
    chrome.storage.onChanged.addListener(listener);
    return () => chrome.storage.onChanged.removeListener(listener);
  }, []);



  return (
    <div className="">
      {authToken ? (
        <ChatMain authToken={authToken} />
      ) : (
        <div>
          <h1>LOGIN 🚀</h1>
          <p>This is a Chrome Extension built with CRXJS + Vite + React.</p>
        </div>
      )}
    </div>
  );
}

export default App;
