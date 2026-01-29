import { BiTime } from 'react-icons/bi';
import { IoSettingsOutline } from 'react-icons/io5';

import { 
    MdOutlineLanguage,
    MdOutlineRecordVoiceOver
  } from "react-icons/md";
import type { Tone } from '../types';
import { useSettings } from '../context/SettingsContext';

interface SettingsProps {
    isSettingsOpen:boolean
}



const Settings = ({
    isSettingsOpen,
}:SettingsProps) => {
  
  // const [summaryLength, setSummaryLength] = useState('medium');
  // const [tone, setTone] = useState<Tone>('neutral');
  // const [language, setLanguage] = useState('en');
  const {settings,setSettings} = useSettings();


   const TONES: Tone[] = [
    "formal",
    "casual",
    "beginner",
    "expert",
    "neutral",
  ];
console.log("isSettingsOpen: ",isSettingsOpen);
  return (
    <div className={`${isSettingsOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'} transition-all duration-300 absolute top-12 left-0 right-0 z-10`}>
    {/* Control Panel */}
    <div className="mx-2 rounded-xl border border-slate-200 bg-white backdrop-blur p-3 shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-slate-700">
          <IoSettingsOutline size={16} className="text-blue-600" />
          <span className="text-sm font-semibold">Settings</span>
        </div>
        <button
          type="button"
          onClick={() => { setSettings({language:"english",length:"medium",tone:"neutral"})}}
          className="text-xs text-blue-600 hover:text-blue-700 px-2 py-1 rounded-md hover:bg-blue-50 transition-colors"
          aria-label="Reset settings to defaults"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Summary Length */}
        <div>
          <label className="block text-[11px] font-medium text-slate-500 mb-1">Length</label>
          <div className="relative">
            <BiTime size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-blue-500" />
            <select
              value={settings.length}
              onChange={(e) => setSettings({...settings,length:e.target.value})}
              className="w-full pl-7 pr-2 py-1.5 bg-white border border-blue-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Summary length"
            >
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="detailed">Detailed</option>
            </select>
          </div>
        </div>

        {/* Language */}
        <div>
          <label className="block text-[11px] font-medium text-slate-500 mb-1">Language</label>
          <div className="relative">
            <MdOutlineLanguage size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-blue-500" />
            <select
              value={settings.language}
              onChange={(e) => setSettings({...settings, language:e.target.value.trim()})}
              className="w-full pl-7 pr-2 py-1.5 bg-white border border-blue-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Language"
            >
                <option value="english">English</option>
                <option value="spanish">Español</option>
                <option value="french">Français</option>
                <option value="german">Deutsch</option>
                <option value="chinese">中文</option>
                <option value="hindi">हिन्दी</option>
                <option value="japanese">日本語</option>
                <option value="korean">한국어</option>
                <option value="italian">Italiano</option>
                <option value="portuguese">Português</option>
                <option value="russian">Русский</option>
                <option value="arabic">العربية</option>
                <option value="bengali">বাংলা</option>
                <option value="urdu">اردو</option>
                <option value="turkish">Türkçe</option>
                <option value="thai">ไทย</option>
                <option value="vietnamese">Tiếng Việt</option>
                <option value="indonesian">Bahasa Indonesia</option>
                <option value="dutch">Nederlands</option>
                <option value="polish">Polski</option>
                <option value="swedish">Svenska</option>
                <option value="filipino">Filipino</option>
                <option value="romanian">Română</option>
                <option value="ukrainian">Українська</option>              
            </select>
          </div>
        </div>

        {/* Tone */}
        <div className="col-span-2">
          <label className="block text-[11px] font-medium text-slate-500 mb-1">Tone</label>
          <div className="relative">
            <MdOutlineRecordVoiceOver size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-blue-500" />
            <select
              value={settings.tone}
              onChange={(e) => setSettings({...settings,tone:e.target.value as Tone})}
              className="w-full pl-7 pr-2 py-1.5 bg-white border border-blue-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Tone"
            >
               {TONES?.map((tone) => (
                  <option key={tone} value={tone}>
                     {tone[0].toUpperCase() + tone.slice(1)}
                   </option>
               ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        {/* <div className="col-span-2 flex items-center justify-end gap-2 pt-1">
          <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors text-sm font-medium" aria-label="Copy">
            <MdOutlineContentCopy size={14} />
            <span>Copy</span>
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors text-sm font-medium" aria-label="Export">
            <MdOutlineFileDownload size={14} />
            <span>Export</span>
          </button>
        </div> */}
      </div>
    </div>
  </div>
  )
}

export default Settings
