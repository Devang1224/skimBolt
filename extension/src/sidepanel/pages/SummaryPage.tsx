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

const SummaryPage = () => {  
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
                    This is a comprehensive summary of the blog post, generated using advanced AI technology. 
                    The summary captures the key points, main arguments, and important insights from the original content.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex quae modi natus cumque! Atque quaerat eligendi quis mollitia? Ab placeat exercitationem aperiam ipsa. Esse, eos quas vitae harum odio amet quo nostrum alias expedita natus praesentium omnis magnam saepe animi quidem illo eligendi totam laborum, molestias consectetur perspiciatis dolore nam. Dolorum, repudiandae. Consequuntur numquam dicta quam harum facere veritatis temporibus beatae unde cum, accusamus fugit quae vero quaerat. Ipsam omnis quod in iure necessitatibus quis architecto ab officia, assumenda modi optio natus voluptas explicabo minima dolor nostrum tempora autem! Aliquam, debitis ducimus. Iusto quos molestiae unde distinctio nobis fugiat perferendis itaque veritatis ullam sunt inventore quo aspernatur nesciunt facilis, illo sed ex numquam delectus sapiente possimus nihil, ipsa, ipsam eligendi eos. Nulla ad quaerat minima amet? Blanditiis ipsum provident sapiente inventore rem, fugiat vero ab vitae, repellendus accusantium explicabo amet laudantium aut. Quod, eos omnis maxime hic ipsa pariatur impedit praesentium debitis, numquam necessitatibus corporis ipsam quidem esse qui quisquam excepturi quaerat mollitia, illum culpa fuga sunt ex quas. Libero, laborum sapiente laudantium doloremque nam hic enim accusamus autem, tempora laboriosam dolore vero! Illo, facere mollitia! Dolorem, voluptas praesentium. Reiciendis rerum facere praesentium nihil amet eius. Culpa tempore maxime nulla aperiam, aliquid optio iusto placeat nesciunt fugit aspernatur accusantium repudiandae asperiores voluptate quidem reiciendis dolorem quasi sed odio beatae possimus ducimus voluptatibus eaque itaque velit! Unde alias temporibus rem ut numquam obcaecati neque blanditiis esse molestiae quaerat, delectus odit fugiat a at, nulla maiores enim commodi, quas possimus ullam eaque sed impedit omnis quo! Doloribus mollitia autem esse veniam at, quas nihil facilis dolorum vel itaque, obcaecati eum. Consequatur sequi nostrum non commodi distinctio! Reiciendis expedita fugiat, tempore cumque exercitationem deleniti error unde eum, commodi odio voluptatem harum dicta. Aliquid in, error accusantium a quas aspernatur molestias itaque nemo, repudiandae ex assumenda nostrum tenetur maxime est vitae harum, sunt quidem nesciunt necessitatibus eos quos at atque. Voluptas repudiandae quae ratione repellat dolorum nulla accusamus reiciendis alias magnam itaque, perspiciatis vitae veniam maiores iure, ipsam, adipisci natus eligendi sit voluptatem! Consectetur sunt quos obcaecati similique laboriosam quisquam harum facere, laudantium, sint reprehenderit eius optio. Animi repudiandae minus omnis libero eligendi magni inventore laudantium quae maiores illum architecto cumque alias blanditiis dolor ipsum fugiat odio, voluptatum corporis voluptatibus eum ex minima. Doloremque, itaque eaque distinctio culpa libero eius sapiente qui accusantium tempore. Magni eligendi quibusdam nemo quidem placeat ab ex libero reprehenderit.
                  </p>
                  <p className="text-slate-700 leading-relaxed text-sm">
                    The AI has analyzed the content structure, identified the core themes, and presented them 
                    in a clear, concise format that maintains the original meaning while being more accessible.
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