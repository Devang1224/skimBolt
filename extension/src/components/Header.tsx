import { useState } from 'react'
import { 
    IoSettingsOutline, 
  } from "react-icons/io5";
  import { 
  
    MdOutlineHistory,
  } from "react-icons/md";
import Settings from './Settings';
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";

const Header = () => {

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="bg-white backdrop-blur-sm border-b border-slate-200 px-3 py-1">
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-1">
          
          <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group cursor-pointer">
            <IoBookmarkOutline className="text-blue-600 group-hover:text-blue-700" size={18} />
          </button>
          <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group cursor-pointer">
            <IoBookmark className="text-blue-600 group-hover:text-blue-700" size={18} />
          </button>
          <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group cursor-pointer">
            <MdOutlineHistory className="text-blue-600 group-hover:text-blue-700" size={18} />
          </button>
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
