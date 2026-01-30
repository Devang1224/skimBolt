
function redirectToLogin() {
  const loginUrl = `${import.meta.env.VITE_WEB_URL}/signin`; 
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

async function clearAuthToken(){
  try{

    await chrome.storage.local.remove("auth-token");
    await chrome.cookies.remove({
      url:import.meta.env.VITE_WEB_URL,
      name:'auth-token'
    })
  }catch(err){
    console.log("Error while remove token");
    return err;
  }
}


export {
    redirectToLogin,
    safeJsonParse,
    checkContentScript,
    clearAuthToken
}


