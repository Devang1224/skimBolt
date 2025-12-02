'use client';

import React, { useRef, useState } from 'react'
import { 
  IoSettingsOutline, 
} from "react-icons/io5";
import { 

  MdOutlineHistory,
} from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import Glossary from '../../components/Glossary';
import Settings from '../../components/Settings';
import MenuBar from '../../components/MenuBar';
import FactCheck from '../../components/FactCheck';
import Insights from '../../components/Insights';


interface SummaryPageProps {
  blogSummary:string
}

const SummaryPage = ({
  blogSummary
}:SummaryPageProps) => {  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [activeTab, setActiveTab] = useState('summary');
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // send message here
    }
  };

  // const tabs = [
  //   { id: 'summary', label: 'Summary', icon: MdOutlineDescription },
  //   { id: 'insights', label: 'Key Insights', icon: MdOutlineFormatListBulleted },
  //   { id: 'fact-check', label: 'Fact Check', icon: MdOutlineFactCheck },
  //   { id: 'glossary', label: 'Glossary', icon: MdOutlineMenuBook }
  // ];

  return (
    <div className='bg-gray-600'>

    <div className=" mx-auto bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col overflow-hidden relative">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-3 py-1">
        <div className="flex items-center justify-end">
          <div className="flex items-center space-x-1">
            <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group cursor-pointer">
              <MdOutlineHistory className="text-blue-600 group-hover:text-blue-700" size={18} />
            </button>
            <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group cursor-pointer" onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
              <IoSettingsOutline className="text-blue-600 group-hover:text-blue-700" size={18} />
            </button>
          </div>
        </div>
      </div>

     


      <Settings isSettingsOpen={isSettingsOpen}/>


      <div className="flex-1 flex flex-col min-h-0">
        
        <div className="flex-1  p-1 ">
          <div className="w-full max-w-none">

           <MenuBar
            setActiveTab={setActiveTab}
            activeTab={activeTab}
           /> 


            {activeTab === 'summary' && (
              <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-blue-100 p-3 shadow-sm overflow-y-auto max-h-[calc(100vh-200px)] scrollbar_custom"
               style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#817e7e8c #f0f0f0'
               }}
              >
                <div className="prose prose-slate max-w-none break-words">
                  <h2 className="text-md font-semibold text-blue-800 mb-4">AI-Powered Blog Summary</h2>
                  <p className="text-slate-700 leading-relaxed mb-4 text-sm">
                    {blogSummary}
                  </p>
                </div>
              </div>
            )}


            {activeTab === 'insights' && <Insights/>}
            {activeTab === 'fact-check' && <FactCheck />}
            {activeTab === 'glossary' && <Glossary />}
          </div>
        </div>


        <div className="bg-white/80 backdrop-blur-sm border-t border-slate-200 p-3">
          <div className="w-full max-w-none">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  placeholder="Ask anything about the blog..."
                  onInput={handleInput}
                  onKeyDown={handleKeyDown}
                  className="text-black w-full resize-none overflow-hidden p-3  border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500
                           focus:border-blue-500 bg-white/90 backdrop-blur-sm text-sm min-h-[40px] max-h-36"
                 />
                {/* <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-blue-50 rounded-lg transition-colors">
                  <MdOutlineLanguage className="text-blue-600" size={18} />
                </button> */}
              </div>
              <button className="px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600
               text-white rounded-xl hover:from-blue-600 hover:to-purple-700
                transition-all duration-200 shadow-md hover:shadow-lg hover:cursor-pointer  text-sm">
                <IoMdSend size={18} className="transform -rotate-90"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

  )
}

export default SummaryPage;