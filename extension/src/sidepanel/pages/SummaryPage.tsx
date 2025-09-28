import React,{useRef} from 'react'

import { BiExport } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLanguage } from "react-icons/io5";


const SummaryPage = () => {  

    const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";                // reset
    el.style.height = el.scrollHeight + "px"; // expand
    console.log(el.style.height);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // send message here
    }
  };


  return (
    <div className="h-screen flex items-center justify-center py-2 bg-gray-400"> 
        <div className="w-full h-full bg-white rounded-lg p-1 flex flex-col">
            <div className="flex items-center justify-between py-2">
                <IoSettingsOutline size={20}/>
                <BiExport size={20}/>
            </div>
               <div className="flex-1 overflow-y-auto p-2 space-y-2 no-scrollbar">
      {/* Example messages */}
      <div className="bg-gray-200 p-2 rounded-lg self-start">Hello 👋</div>
      <div className="bg-blue-500 text-white p-2 rounded-lg self-end">Hi there!</div>
      <div className="bg-gray-200 p-2 rounded-lg self-start">How are you?</div>
         <div className="bg-gray-200 p-2 rounded-lg self-start">Hello 👋</div>
      <div className="bg-blue-500 text-white p-2 rounded-lg self-end">Hi there!</div>
      <div className="bg-gray-200 p-2 rounded-lg self-start">How are you?</div>   <div className="bg-gray-200 p-2 rounded-lg self-start">Hello 👋</div>
      <div className="bg-blue-500 text-white p-2 rounded-lg self-end">Hi there!</div>
      <div className="bg-gray-200 p-2 rounded-lg self-start">How are you?</div>   <div className="bg-gray-200 p-2 rounded-lg self-start">Hello 👋</div>
      <div className="bg-blue-500 text-white p-2 rounded-lg self-end">Hi there!</div>
      <div className="bg-gray-200 p-2 rounded-lg self-start">How are you?</div>   <div className="bg-gray-200 p-2 rounded-lg self-start">Hello 👋</div>
      <div className="bg-blue-500 text-white p-2 rounded-lg self-end">Hi there!</div>
      <div className="bg-gray-200 p-2 rounded-lg self-start">How are you?</div>   <div className="bg-gray-200 p-2 rounded-lg self-start">Hello 👋</div>
      <div className="bg-blue-500 text-white p-2 rounded-lg self-end">Hi there!</div>
      <div className="bg-gray-200 p-2 rounded-lg self-start">How are you?</div>   <div className="bg-gray-200 p-2 rounded-lg self-start">Hello 👋</div>
      <div className="bg-blue-500 text-white p-2 rounded-lg self-end">Hi there!</div>
      <div className="bg-gray-200 p-2 rounded-lg self-start">How are you?</div>   <div className="bg-gray-200 p-2 rounded-lg self-start">Hello 👋</div>
      <div className="bg-blue-500 text-white p-2 rounded-lg self-end">Hi there!</div>
      <div className="bg-gray-200 p-2 rounded-lg self-start">How are you?</div>   <div className="bg-gray-200 p-2 rounded-lg self-start">Hello 👋</div>
      <div className="bg-blue-500 text-white p-2 rounded-lg self-end">Hi there!</div>
      <div className="bg-gray-200 p-2 rounded-lg self-start">How are you?</div>   <div className="bg-gray-200 p-2 rounded-lg self-start">Hello 👋</div>
      <div className="bg-blue-500 text-white p-2 rounded-lg self-end">Hi there!</div>
      <div className="bg-gray-200 p-2 rounded-lg self-start">How are you?</div>   <div className="bg-gray-200 p-2 rounded-lg self-start">Hello 👋</div>
      <div className="bg-blue-500 text-white p-2 rounded-lg self-end">Hi there!</div>
      <div className="bg-gray-200 p-2 rounded-lg self-start">How are you?</div>   <div className="bg-gray-200 p-2 rounded-lg self-start">Hello 👋</div>
      <div className="bg-blue-500 text-white p-2 rounded-lg self-end">Hi there!</div>
      <div className="bg-gray-200 p-2 rounded-lg self-start">How are you?</div>
      <div className="bg-gray-200 p-2 rounded-lg self-start">How are you?</div>
      <div className="bg-gray-200 p-2 rounded-lg self-start">ENDING</div>

    </div>

               <div className="flex items-end border-t p-2">
      <textarea
             ref={textareaRef}
        rows={1}
        placeholder="Chat with summary..."
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        className="resize-none overflow-hidden flex-1 p-2 border rounded-lg focus:outline-none max-h-40"
      />
      <div className="p-2">
        <IoLanguage size={20} />
      </div>
    </div>
        </div>
    </div>
  )
}

export default SummaryPage