import { ReactElement } from "react"

interface SideBarProp {
  text:string,
  icon:ReactElement 
}

const SideBarItem = ({text,icon}:SideBarProp) => {
  return (
    <div className="flex text-gray-800 items-center py-2 hover:bg-gray-200 rounded max-w-48 cursor-pointer transition-all duration-200 pl-4"> 
      <div className="px-2">
        {icon}
      </div>
      <div className="px-2">
        {text}
      </div>
    </div>
  )
}

export default SideBarItem