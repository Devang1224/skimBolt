import React, { createContext, useContext, useState, type ReactNode } from 'react'
import type { Settings } from '../types';



interface SettingsContextValue{
    settings: Settings;
    setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

 const SettingsContext = createContext<SettingsContextValue | null>(null);

export const SettingsProvider = ({children}:{children: ReactNode}) => {

 const [settings,setSettings] = useState<Settings>({
    language:"english",
    tone:"neutral",
    length:"medium"
 })
 console.log("SETTINGS: ",settings);
  return (
    <SettingsContext.Provider value={{settings,setSettings}}>
      {children}
    </SettingsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings(){
    const context = useContext(SettingsContext);
    if(!context){
        throw new Error("useSettings must be used inside a <SettingsProvider>");
    }
    return context;
  }
  


