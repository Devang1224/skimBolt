
function redirectToLogin() {
  const loginUrl = `${import.meta.env.VITE_BACKEND_URL}/signin`; 
  chrome.tabs.create({ url: loginUrl });
}


function safeJsonParse<T>(str: string): T {
  try {
    const cleaned = str.replace(/`|`/g, "").trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Invalid JSON returned by AI:", err);
    throw new Error("AI returned invalid JSON.");
  }
}


function checkContentScript(tabId: number | undefined) {
  if (!tabId) return;
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(
      tabId,
      { type: "PING_CONTENT_SCRIPT" },
      (response: { injected?: boolean } | undefined) => {
        if (chrome.runtime.lastError) {
          resolve(false);
        } else {
          resolve(response?.injected === true);
        }
      }
    );
  });
}


export {
    redirectToLogin,
    safeJsonParse,
    checkContentScript
}


