// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SettingsProvider } from '../context/SettingsContext.tsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <SettingsProvider>
       <App />
       <Toaster
        position="top-center"
        toastOptions={{
          style: {
            zIndex: 2147483647, 
          },
        }}
      />
    </SettingsProvider>
  // </StrictMode>,
)
