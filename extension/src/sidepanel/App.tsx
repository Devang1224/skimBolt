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
    <div className="h-full">
      {authToken ? (
        <ChatMain authToken={authToken} />
      ) : (
        <div className="flex h-full flex-1 items-center justify-center px-4 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="w-full max-w-md text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h1 className="text-3xl font-bold text-blue-600 tracking-tight">
              LOGIN
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
