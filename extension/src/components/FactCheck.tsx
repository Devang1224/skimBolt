
import { BiCheckCircle } from 'react-icons/bi'
import { IoShieldCheckmark } from 'react-icons/io5'
import { MdOutlineFactCheck } from 'react-icons/md'

const FactCheck = () => {
  return (
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
  )
}

export default FactCheck
