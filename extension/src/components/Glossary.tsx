
import { 
    MdOutlineMenuBook,
  } from "react-icons/md";

const Glossary = () => {
  return (
    <div className="mt-4 bg-white/70 backdrop-blur-sm rounded-xl border border-blue-100 p-3 shadow-sm overflow-y-auto max-h-[calc(100vh-200px)] scrollbar_custom">
    <h3 className="text-md font-semibold text-slate-800 mb-3 flex items-center space-x-2">
      <MdOutlineMenuBook className="text-purple-500" size={20} />
      <span>Contextual Glossary</span>
    </h3>
    <div className="space-y-3 text-sm">
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
  )
}

export default Glossary
