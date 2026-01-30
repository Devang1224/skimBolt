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
      if (!response) {
        console.log("found no response from fetchauthtoken");
        return;
      }

      if (response.status === "AUTHENTICATED") {
        setAuthToken(response.token);
      }
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
        <div className="flex h-full min-h-[100vh] items-center justify-center bg-gradient-to-br from-skimbolt-bg-gradient-start via-skimbolt-bg-gradient-mid to-skimbolt-bg-gradient-end px-3">
          <div
            className="w-full max-w-sm rounded-2xl border border-skimbolt-card-border bg-skimbolt-card-bg backdrop-blur-xl
                     shadow-[0_20px_40px_var(--color-skimbolt-card-shadow)] p-6 text-center space-y-5"
          >
            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl
                          bg-gradient-to-br from-skimbolt-logo-gradient-start to-skimbolt-logo-gradient-end shadow-md"
            >
              <span className="text-xl text-skimbolt-text-white">🚀</span>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight text-skimbolt-text-primary">
                Skim<span className="text-skimbolt-text-accent">Bolt</span>
              </h1>
              <p className="text-sm text-skimbolt-text-secondary">
                AI-powered article summarizer
              </p>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-skimbolt-divider to-transparent" />

            <button
              className="w-full rounded-xl bg-gradient-to-r from-skimbolt-button-gradient-start to-skimbolt-button-gradient-end
                       px-4 py-2.5 text-sm font-medium text-skimbolt-text-white
                       shadow-lg shadow-[var(--color-skimbolt-button-shadow)]
                       transition-all duration-200
                       hover:translate-y-[-1px] hover:shadow-xl
                       active:translate-y-0 active:shadow-md
                       focus:outline-none focus:ring-2 focus:ring-skimbolt-focus-ring focus:ring-offset-2 cursor-pointer"
              onClick={() => {
                chrome.tabs.create({
                  url: `${import.meta.env.VITE_WEB_URL}/signin`,
                });
              }}
            >
              Login to continue
            </button>

            <p className="text-xs text-skimbolt-text-tertiary leading-relaxed">
              You’ll be redirected to the SkimBolt website to sign in securely.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
