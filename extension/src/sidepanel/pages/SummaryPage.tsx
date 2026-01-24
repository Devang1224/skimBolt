"use client";

import React, { useRef, useState } from "react";

import { IoMdSend } from "react-icons/io";
import Glossary from "../../components/Glossary";
import MenuBar from "../../components/MenuBar";
// import FactCheck from '../../components/FactCheck';
// import Insights from '../../components/Insights';
import type { GlossaryItem } from "../../types";
import toast from "react-hot-toast";
import { userApi } from "../../middleware";
import { useSettings } from "../../context/SettingsContext";

interface SummaryPageProps {
  blogSummary: string;
  blogGlossary: GlossaryItem[];
}

interface ChatItemType {
  role:"system" | "user",
  content:string,
}

const SummaryPage = ({ blogSummary, blogGlossary }: SummaryPageProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [activeTab, setActiveTab] = useState("summary");
  const {settings}  = useSettings();
  const [chats,setChats] = useState<ChatItemType[]>([]);

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleChat()
    }
  };
  
  

  const handleChat = async () => {
    try {
      const ques = textareaRef.current?.value.trim() || "";
      if(!ques){
        toast.error("Message cannot be empty");
        return;
      }
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (!tab?.id) {
        throw new Error("Active tab not found");
      }
      if (!tab.url) {
        throw new Error("Tab URL not found");
      }
      if(textareaRef.current){
        textareaRef.current.value = '';
      }
      setChats((prev)=>([...prev,{
        role:"user",
        content:ques,
      }]));

       const res = await userApi.post(`/summaryChat`,{
        source:'user',
        query:ques,
        url: tab.url,
        settings:settings
       })
       console.log("AI RESPONSE FOR USER QUERY: ",res.data?.aiResp);
       const aiText = res.data?.aiResp;
       setChats((prev)=>([...prev,{
        role:'system',
        content: aiText,
       }]))
     

    } catch (err) {
      console.log("Error while sending the query",err);
      toast.error(`Error While Sending The Query: ${err}`);
    }
  };

  // const tabs = [
  //   { id: 'summary', label: 'Summary', icon: MdOutlineDescription },
  //   { id: 'insights', label: 'Key Insights', icon: MdOutlineFormatListBulleted },
  //   { id: 'fact-check', label: 'Fact Check', icon: MdOutlineFactCheck },
  //   { id: 'glossary', label: 'Glossary', icon: MdOutlineMenuBook }
  // ];

  console.log(blogSummary, blogGlossary);
  return (
    <div className="bg-gray-600">
      <div className=" mx-auto bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col overflow-hidden relative">
        {/* Header */}

        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 p-1 ">
            <div className="w-full max-w-none">
              <MenuBar setActiveTab={setActiveTab} activeTab={activeTab} />

              {activeTab === "summary" && (
                <div
                  className="bg-white/70 backdrop-blur-sm rounded-xl border border-blue-100 p-3 
               shadow-sm overflow-y-auto h-[calc(100vh-170px)] scrollbar_custom"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#817e7e8c #f0f0f0",
                  }}
                >
                  <div className="max-w-none break-words">
                    <p
                      className="text-slate-700 leading-relaxed mb-4 text-sm"
                      dangerouslySetInnerHTML={{ __html: blogSummary }}
                    />
                  </div>
                  {/* CHATS */}
                  {
                    chats?.map((item,index)=>(
                     <div className={`mt-3 flex ${item.role ==='system' ? 'justify-start' : 'justify-end'}`}>
                      <div key={index} className= {`flex flex-col gap-2 text-black/70  
                                      ${item.role ==='system' ? 'items-start' : 'items-end'} `}>
                         <p className="uppercase">{item.role}</p>
                         <div className="bg-blue-300/40 rounded-lg p-2">
                           <div className="text-left" dangerouslySetInnerHTML={{__html: item.content}}/>
                          </div>
                      </div>
                     </div>
                    ))
                  }
                </div>
              )}

              {/* {activeTab === 'insights' && <Insights/>} */}
              {/* {activeTab === 'fact-check' && <FactCheck />} */}
              {activeTab === "glossary" && (
                <Glossary blogGlossary={blogGlossary} />
              )}
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
                <button
                  className="px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600
               text-white rounded-xl hover:from-blue-600 hover:to-purple-700
                transition-all duration-200 shadow-md hover:shadow-lg hover:cursor-pointer  text-sm"
                  onClick={() => {
                    handleChat();
                  }}
                >
                  <IoMdSend size={18} className="transform -rotate-90" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
