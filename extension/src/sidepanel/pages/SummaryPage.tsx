'use client';

import React, { useRef, useState } from 'react'

import { IoMdSend } from "react-icons/io";
import Glossary from '../../components/Glossary';
import MenuBar from '../../components/MenuBar';
// import FactCheck from '../../components/FactCheck';
// import Insights from '../../components/Insights';
import type { GlossaryItem } from '../../types';


interface SummaryPageProps {
  blogSummary:string,
  blogGlossary: GlossaryItem[]
}

const SummaryPage = ({
  blogSummary,
  blogGlossary
}:SummaryPageProps) => {  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [activeTab, setActiveTab] = useState('summary');
  

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

  console.log(blogSummary,blogGlossary);
  return (
    <div className='bg-gray-600'>

    <div className=" mx-auto bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col overflow-hidden relative">
      {/* Header */}

      <div className="flex-1 flex flex-col min-h-0">
        
        <div className="flex-1 p-1 ">
          <div className="w-full max-w-none">

           <MenuBar
            setActiveTab={setActiveTab}
            activeTab={activeTab}
           /> 

            {activeTab === 'summary' && (
              <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-blue-100 p-3 
               shadow-sm overflow-y-auto h-[calc(100vh-170px)] scrollbar_custom"
               style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#817e7e8c #f0f0f0'
               }}
              >
                <div className="max-w-none break-words">

                  <p className="text-slate-700 leading-relaxed mb-4 text-sm" dangerouslySetInnerHTML={{__html: blogSummary}}/>
                  {/* <p className="text-slate-700 leading-relaxed mb-4 text-sm text-left"><h2>How to Start a Blog: A Comprehensive Guide for Beginners</h2>
<p>This guide provides a detailed, beginner-friendly walkthrough on creating a blog in approximately 20 minutes, covering essential steps from selecting a blog name and securing hosting to customizing the design, publishing content, promoting it effectively, and exploring various monetization strategies. It emphasizes that a passion for the topic is key to success, not necessarily expert writing skills, and encourages aspiring bloggers to leverage the current growth of online audiences.</p>

<h2>Key Points</h2>
<ul>
<li>Starting a blog involves six core steps: picking a name, getting it online (hosting/domain), customizing the design, writing the first post, promoting it, and exploring monetization.</li>
<li>Successful blogging primarily requires a <mark>passion</mark> for the chosen topic and allows for writing in an informal, conversational style, rather than needing to be a great writer or expert.</li>
<li>A blog is a type of <mark>website</mark> focused on written <mark>content</mark> (blog posts), often from a personal perspective, and typically includes a comments section for direct reader interaction.</li>
<li>To establish a blog online, you need <mark>domain registration</mark>, <mark>blog hosting</mark>, and blogging software like <mark>WordPress</mark>, which are often bundled together by providers such as BlueHost.</li>
<li><mark>WordPress themes</mark> allow easy customization of a blog's entire layout and design, with thousands of free options available to change the appearance with a few clicks.</li>
<li>Blogs should incorporate both static content (e.g., About Me, Contact, Disclaimer, Privacy Policy) and dynamic content (regularly published blog posts) for completeness and engagement.</li>
<li>Effective blog posts should feature alluring titles, be lengthy yet broken into short paragraphs with headings and images, engage readers with questions, and always contain original content and photos.</li>
<li>Promoting a blog involves alerting an inner circle, utilizing <mark>social media</mark>, commenting on other blogs, actively engaging with visitors, collaborating with fellow bloggers, posting regularly, and building an <mark>email list</mark>.</li>
<li><mark>SEO</mark> (Search Engine Optimization) for a new blog includes using header tags, categorizing content, and setting permalinks to improve visibility in search engine results over time.</li>
<li>Monetization strategies for blogs include selling <mark>advertising space</mark> (e.g., Google Adsense), <mark>affiliate products</mark>, direct products/services, digital downloads (like ebooks), or offering paid memberships for exclusive content.</li>
</ul>

<h2>Takeaways</h2>
<ul>
<li>Blogging is highly accessible to beginners, requiring only basic computer skills and offering a quick setup process.</li>
<li>A blog serves as a versatile platform for sharing knowledge, fostering community, gaining recognition, and generating passive income.</li>
<li>Consistent content creation and proactive promotion across various channels are vital for growing a blog's audience and maintaining engagement.</li>
<li>Including essential static pages like a Disclaimer and Privacy Policy is crucial, especially for blogs that monetize or collect user data, to comply with legal guidelines.</li>
<li>Building a loyal audience and trust with readers is a foundational step before successfully implementing various monetization strategies.</li>
</ul></p> */}
                </div>
              </div>
            )}


            {/* {activeTab === 'insights' && <Insights/>} */}
            {/* {activeTab === 'fact-check' && <FactCheck />} */}
            {activeTab === 'glossary' && <Glossary blogGlossary={blogGlossary} />}
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