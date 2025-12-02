function redirectToLogin() {
  const loginUrl = `${import.meta.env.VITE_BACKEND_URL}/signin`; 
  chrome.tabs.create({ url: loginUrl });
}


function safeJsonParse<T>(str: string): T {
  try {
    return JSON.parse(str);
  } catch (err) {
    console.error("Invalid JSON returned by AI:", err);
    throw new Error("AI returned invalid JSON.");
  }
}


export {
    redirectToLogin,
    safeJsonParse
}


