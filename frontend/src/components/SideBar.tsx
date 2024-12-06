import { BrainIcon } from "../icons/BrainIcon"
import { TwitterIcon } from "../icons/TwitterIcon"
import { YouttubeIcon } from "../icons/YouttubeIcon"
import SideBarItem from "./SideBarItem"


export const SideBar = () => {
  return (
    <div className="border w-72 h-screen fixed pt-8">
        <div className="flex justify-between items-center w-44 pl-4">
            <BrainIcon size="lg" ></BrainIcon>
            <p className="text-xl font-bold">Second Brain</p>
        </div>

        <div className="pt-8 pl-4">
          <SideBarItem text="Twitter" icon={<TwitterIcon size="md"/>}></SideBarItem>
          <SideBarItem text="YouTube" icon={<YouttubeIcon size="md"/>}></SideBarItem>
        </div>
    </div>
  )
}
