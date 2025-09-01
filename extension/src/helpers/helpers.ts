function redirectToLogin() {
  const loginUrl = `${import.meta.env.VITE_BACKEND_URL}/signin`; 
  chrome.tabs.create({ url: loginUrl });
}





export {
    redirectToLogin
}


