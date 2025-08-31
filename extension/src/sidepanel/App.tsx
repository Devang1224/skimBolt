
import './App.css'

function App() {


const getAuthToken = async()=>{
  try{
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/extension-token`,{
      method:"GET",
      credentials:"include"
    });
    const data = await res.json();
    console.log("token from the server: ",data);

  } catch(err){
    console.log("Login error: ", err);
  } 
}

  return (

 <div style={{ padding: "20px" }}>
      <h1>Hello World 🚀</h1>
      <p>This is a Chrome Extension built with CRXJS + Vite + React.</p>

      <div>
        <button onClick={getAuthToken}>
          <p>Login</p>
        </button>
      </div>
    </div>
  )
}

export default App
