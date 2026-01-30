import { useState } from 'react'
import { 
    IoSettingsOutline, 
  } from "react-icons/io5";
import Settings from './Settings';

import type { GlossaryItem } from '../types';


interface HeaderProps {
  blogSummary:string;
  blogGlossary:GlossaryItem[];
  // isSavedSummary:boolean
}

const Header = ({
  blogSummary,
  blogGlossary,
}:HeaderProps) => {

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  // const [summarySaved,setSavedSummary] = useState("");

  // const saveSummary = async()=>{
  //   try{
  //     console.log(blogSummary,blogGlossary);
  //     setSavedSummary(true);
  //   }catch(err){
  //     console.log(err);
  //   }
  // }

  // const unSaveSummary = async ()=>{
  //   try{
  //     console.log("deleting saved summary")
  //   }catch(err){
  //     console.log(err);
  //   }
  // }

  console.log(blogGlossary);
  console.log(blogSummary);



  return (
    <div className="bg-white backdrop-blur-sm border-b border-slate-200 px-3 py-1 relative z-10">
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-1">
          {/* {
            summarySaved ? (
              <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group cursor-pointer" onClick={saveSummary}>
                 <IoBookmarkOutline className="text-blue-600 group-hover:text-blue-700" size={18} />
              </button>
            ):(
              <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group cursor-pointer" onClick={unSaveSummary}>
                <IoBookmark className="text-blue-600 group-hover:text-blue-700" size={18} />
              </button>
            )
          } */}
          {/* <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group cursor-pointer">
            <MdOutlineHistory className="text-blue-600 group-hover:text-blue-700" size={18} />
          </button> */}
          <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group cursor-pointer"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          >
          <IoSettingsOutline className="text-blue-600 group-hover:text-blue-700" size={18} />
        </button>
      </div>
    </div>
    <Settings isSettingsOpen={isSettingsOpen}/>
  </div>
  )
}

export default Header;
