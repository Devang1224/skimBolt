import React, { useRef, useState } from 'react'
import { 
  BiTime,
  BiCheckCircle,
} from "react-icons/bi";
import { 
  IoSettingsOutline, 
  IoShieldCheckmark
} from "react-icons/io5";
import { 
  MdOutlineFormatListBulleted,
  MdOutlineFactCheck,
  MdOutlineAccessTime,
  MdOutlineMenuBook,
  MdOutlineChat,
  MdOutlineLanguage,
  MdOutlineHistory,
  MdOutlineFileDownload,
  MdOutlineContentCopy,
  MdOutlineDescription
} from "react-icons/md";

const SummaryPage = () => {  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [activeTab, setActiveTab] = useState('summary');
  const [summaryLength, setSummaryLength] = useState('medium');
  const [tone, setTone] = useState('balanced');
  const [language, setLanguage] = useState('en');

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

  const tabs = [
    { id: 'summary', label: 'Summary', icon: MdOutlineDescription },
    { id: 'insights', label: 'Key Insights', icon: MdOutlineFormatListBulleted },
    { id: 'chat', label: 'Talk to Blog', icon: MdOutlineChat },
    { id: 'fact-check', label: 'Fact Check', icon: MdOutlineFactCheck },
    { id: 'glossary', label: 'Glossary', icon: MdOutlineMenuBook }
  ];

  return (
    <div className="h-screen w-full max-w-[450px] mx-auto bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-3 py-2">
        <div className="flex items-center justify-end">
          <div className="flex items-center space-x-1">
            <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group">
              <MdOutlineHistory className="text-blue-600 group-hover:text-blue-700" size={18} />
            </button>
            <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group">
              <IoSettingsOutline className="text-blue-600 group-hover:text-blue-700" size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-slate-200 px-3 py-2">
        <div className="flex flex-wrap items-center gap-3">
          {/* Basic Controls */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-blue-600">Basic:</span>
            <button className="flex items-center space-x-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors text-sm font-medium">
              <MdOutlineContentCopy size={14} />
              <span>Copy</span>
            </button>
            <div className="relative">
              <button className="flex items-center space-x-1 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors text-sm font-medium">
                <MdOutlineFileDownload size={14} />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Summary Length */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-blue-600">Length:</span>
            <select 
              value={summaryLength} 
              onChange={(e) => setSummaryLength(e.target.value)}
              className="px-2 py-1.5 bg-white border border-blue-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="detailed">Detailed</option>
            </select>
          </div>

          {/* Language */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-blue-600">Language:</span>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="px-2 py-1.5 bg-white border border-blue-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="zh">Chinese</option>
            </select>
          </div>

          {/* Tone Control */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-blue-600">Tone:</span>
            <select 
              value={tone} 
              onChange={(e) => setTone(e.target.value)}
              className="px-2 py-1.5 bg-white border border-blue-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="formal">Formal</option>
              <option value="casual">Casual</option>
              <option value="beginner">Beginner</option>
              <option value="expert">Expert</option>
              <option value="balanced">Balanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Feature Tabs */}
      <div className="bg-white/40 backdrop-blur-sm border-b border-slate-200 px-3">
        <div className="flex space-x-1 overflow-x-auto no-scrollbar -mx-1 px-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-700 border-b-2 border-blue-600'
                    : 'text-blue-500 hover:text-blue-700 hover:bg-white/50'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Content Display */}
        <div className="flex-1 overflow-y-auto p-3">
          <div className="w-full max-w-none">
            {/* Reading Time & Stats */}
            <div className="mb-4 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-blue-200">
              <div className="flex items-center justify-between text-sm text-blue-600">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <MdOutlineAccessTime size={16} />
                    <span className="font-medium">Original: 8 min read</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BiTime size={16} />
                    <span className="font-medium">Summary: 2 min read</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <BiCheckCircle className="text-emerald-500" size={16} />
                  <span className="font-medium text-emerald-600">Fact-checked</span>
                </div>
              </div>
            </div>

            {/* Summary Content */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-blue-200 p-4 shadow-sm">
              <div className="prose prose-slate max-w-none break-words">
                <h2 className="text-xl font-semibold text-blue-800 mb-4">AI-Powered Blog Summary</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  This is a comprehensive summary of the blog post, generated using advanced AI technology. 
                  The summary captures the key points, main arguments, and important insights from the original content.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  The AI has analyzed the content structure, identified the core themes, and presented them 
                  in a clear, concise format that maintains the original meaning while being more accessible.
                </p>
              </div>
            </div>

            {/* Key Insights Section */}
            {activeTab === 'insights' && (
              <div className="mt-4 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                  <MdOutlineFormatListBulleted className="text-blue-500" size={20} />
                  <span>Key Insights</span>
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-700">First key insight about the main topic</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-700">Second important point with supporting evidence</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-700">Third insight that provides actionable information</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Chat Interface */}
            {activeTab === 'chat' && (
              <div className="mt-4 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                  <MdOutlineChat className="text-green-500" size={20} />
                  <span>Talk to Blog</span>
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto break-words">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-800">What are the main benefits mentioned in this article?</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg ml-8">
                    <p className="text-sm text-slate-700">The article highlights three main benefits: improved efficiency, cost reduction, and enhanced user experience.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Fact Check Section */}
            {activeTab === 'fact-check' && (
              <div className="mt-4 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                  <MdOutlineFactCheck className="text-orange-500" size={20} />
                  <span>Fact Check Results</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <BiCheckCircle className="text-green-500" size={20} />
                    <span className="text-sm text-green-800">Claim verified by 3 reliable sources</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <IoShieldCheckmark className="text-yellow-500" size={20} />
                    <span className="text-sm text-yellow-800">Partial verification - needs more sources</span>
                  </div>
                </div>
              </div>
            )}

            {/* Glossary Section */}
            {activeTab === 'glossary' && (
              <div className="mt-4 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                  <MdOutlineMenuBook className="text-purple-500" size={20} />
                  <span>Contextual Glossary</span>
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-800">Machine Learning</h4>
                    <p className="text-sm text-purple-700 mt-1">A subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed.</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-800">Neural Network</h4>
                    <p className="text-sm text-purple-700 mt-1">A computing system inspired by biological neural networks that can recognize patterns and make decisions.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chat Input */}
        <div className="bg-white/80 backdrop-blur-sm border-t border-slate-200 p-3">
          <div className="w-full max-w-none">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  placeholder="Ask a question about the blog content..."
                  onInput={handleInput}
                  onKeyDown={handleKeyDown}
                  className="w-full resize-none overflow-hidden p-3 pr-12 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90 backdrop-blur-sm text-sm min-h-[40px] max-h-36"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-blue-50 rounded-lg transition-colors">
                  <MdOutlineLanguage className="text-blue-600" size={18} />
                </button>
              </div>
              <button className="px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg text-sm">
                <MdOutlineChat size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SummaryPage