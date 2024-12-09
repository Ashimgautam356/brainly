import { useNavigate } from "react-router-dom"
import { BrainIcon } from "../icons/BrainIcon"
import { TwitterIcon } from "../icons/TwitterIcon"
import { UserIcon } from "../icons/UserIcon"
import { YouttubeIcon } from "../icons/YouttubeIcon"
import { Button } from "./Button"
import SideBarItem from "./SideBarItem"


export const SideBar = () => {
  const navigate = useNavigate()

  const logout =()=>{
    localStorage.removeItem("token") 
    navigate("/")
  }

  return ( 
    <div className="border w-72 h-screen fixed pt-8">
      <div className="h-full w-full flex flex-col justify-between ">

          <div>
            <div className="flex justify-between items-center w-44 pl-4">
              <BrainIcon size="lg" ></BrainIcon>
              <p className="text-xl font-bold">Second Brain</p>
            </div>

            <div className="pt-8 pl-4">
              <SideBarItem text="Twitter" icon={<TwitterIcon size="md"/>}></SideBarItem>
              <SideBarItem text="YouTube" icon={<YouttubeIcon size="md"/>}></SideBarItem>
            </div>
          </div>

          <div className="p-8">
            <div className="flex flex-row justify-between items-center">
              <div>
              <Button text="Logout" variants="primary" size="md" onClick={logout}></Button>
              </div>
              <div className="pl-4 flex flex-wrap">
                <p className="text-lg font-semibold pr-2">{"hello"}</p>
                <UserIcon size="lg"></UserIcon>
              </div>
            </div>
          </div>

      </div>
    </div>
  )
}
