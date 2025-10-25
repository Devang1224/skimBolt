
import { MdOutlineFormatListBulleted } from 'react-icons/md'

const Insights = () => {
  return (
    <div className="mt-4 bg-white/70 backdrop-blur-sm rounded-xl border border-blue-100 p-3 shadow-sm overflow-y-auto max-h-[calc(100vh-200px)] scrollbar_custom">
    <h3 className="text-md font-semibold text-slate-800 mb-3 flex items-center space-x-2 ">
      <MdOutlineFormatListBulleted className="text-blue-500" size={15} />
      <span>Key Insights</span>
    </h3>
    <ul className="space-y-2 text-sm">
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
  )
}

export default Insights
