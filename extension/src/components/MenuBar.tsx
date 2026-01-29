
import { BiTime } from 'react-icons/bi'

interface MenuBarProps {
    setActiveTab:(tab:string)=>void,
    activeTab:string,
    blogMetaData:any;
}

const MenuBar = ({
    setActiveTab,
    activeTab,
    blogMetaData
}:MenuBarProps) => {
  return (
    <div className="p-1">
    <div className="flex items-center justify-between">
      <div className="inline-flex rounded-md border border-blue-100 bg-white/70 p-0.5 shadow-sm">
        {[
          { id: 'summary', label: 'Summary' },
          // { id: 'insights', label: 'Insights' },
          { id: 'glossary', label: 'Glossary' },
        ].map((seg) => (
          <button
            key={seg.id}
            onClick={() => setActiveTab(seg.id)}
            aria-pressed={activeTab === seg.id}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === seg.id
                ? 'bg-white text-blue-700 shadow'
                : 'text-slate-600 hover:text-blue-700 hover:bg-white/60'
            }`}
          >
            {seg.label}
          </button>
        ))}
      </div>
      <div className="flex items-center space-x-1 text-slate-500">
        <BiTime size={14} />
        <span className="font-medium text-xs">{Math.ceil(blogMetaData?.word_count / 200)} min read</span>
      </div>
    </div>
  </div>
  )
}

export default MenuBar
