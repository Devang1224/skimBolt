import { useState } from 'react'
import { 
    IoSettingsOutline, 
  } from "react-icons/io5";
  import { 
  
    MdOutlineHistory,
  } from "react-icons/md";
import Settings from './Settings';

const Header = () => {

  const [isSettingsOpen, setIsSettingsOpen] = useState(true);

  return (
    <div className="bg-white backdrop-blur-sm border-b border-slate-200 px-3 py-1">
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-1">
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
