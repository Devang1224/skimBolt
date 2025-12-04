
import { 
    MdOutlineMenuBook,
  } from "react-icons/md";
import type { GlossaryItem } from "../types";

interface GlossaryProps{
  blogGlossary: GlossaryItem[]

}

const Glossary = ({
  blogGlossary
}:GlossaryProps) => {
  console.log("blogGlossary: ", blogGlossary);
  return (
    <div className=" bg-white/70 backdrop-blur-sm rounded-xl border border-blue-100 p-3 shadow-sm overflow-y-auto h-[calc(100vh-170px)] scrollbar_custom">
    <h3 className="text-md font-semibold text-slate-800 mb-3 flex items-center space-x-2">
      <MdOutlineMenuBook className="text-purple-500" size={20} />
      <span>Contextual Glossary</span>
    </h3>
    <div className="space-y-3 text-sm">
      {
        blogGlossary?.map((item,index)=>(
          <div className="p-3 bg-purple-50 rounded-lg" key={index}>
            <h4 className="font-medium text-purple-800">{item.term}</h4>
            <p className="text-sm text-purple-700 mt-1">{item.meaning}</p>
          </div>
        ))
      }
    </div>
  </div>
  )
}

export default Glossary
