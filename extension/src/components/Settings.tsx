import { useState } from 'react'
import { BiTime } from 'react-icons/bi';
import { IoSettingsOutline } from 'react-icons/io5';

import { 
    MdOutlineFileDownload,
    MdOutlineContentCopy,
    MdOutlineLanguage,
    MdOutlineRecordVoiceOver
  } from "react-icons/md";

interface SettingsProps {
    isSettingsOpen:boolean
}

type Tone = 'neutral' | 'formal' | 'expert' | 'beginner' | 'casual';

const Settings = ({
    isSettingsOpen,
}:SettingsProps) => {
  
  const [summaryLength, setSummaryLength] = useState('medium');
  const [tone, setTone] = useState<Tone>('neutral');
  const [language, setLanguage] = useState('en');

   const TONES: Tone[] = [
    "formal",
    "casual",
    "beginner",
    "expert",
    "neutral",
  ];

  return (
    <div className={`${isSettingsOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'} transition-all duration-300 absolute top-12 left-0 right-0 z-10`}>
    {/* Control Panel */}
    <div className="mx-2 rounded-xl border border-slate-200 bg-white/80 backdrop-blur p-3 shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-slate-700">
          <IoSettingsOutline size={16} className="text-blue-600" />
          <span className="text-sm font-semibold">Settings</span>
        </div>
        <button
          type="button"
          onClick={() => { setSummaryLength('medium'); setLanguage('en'); setTone('neutral'); }}
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
              value={summaryLength}
              onChange={(e) => setSummaryLength(e.target.value)}
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
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full pl-7 pr-2 py-1.5 bg-white border border-blue-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Language"
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
              <option value="chinese">Chinese</option>
            </select>
          </div>
        </div>

        {/* Tone */}
        <div className="col-span-2">
          <label className="block text-[11px] font-medium text-slate-500 mb-1">Tone</label>
          <div className="relative">
            <MdOutlineRecordVoiceOver size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-blue-500" />
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as Tone)}
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
        <div className="col-span-2 flex items-center justify-end gap-2 pt-1">
          <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors text-sm font-medium" aria-label="Copy">
            <MdOutlineContentCopy size={14} />
            <span>Copy</span>
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors text-sm font-medium" aria-label="Export">
            <MdOutlineFileDownload size={14} />
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Settings
