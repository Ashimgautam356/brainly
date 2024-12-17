import { useNavigate } from "react-router-dom"
import { BrainIcon } from "../icons/BrainIcon"
import { TwitterIcon } from "../icons/TwitterIcon"
import { UserIcon } from "../icons/UserIcon"
import { YouttubeIcon } from "../icons/YouttubeIcon"
import { Button } from "./Button"
import SideBarItem from "./SideBarItem"
import { NavLink } from "react-router-dom"
import OtherIcon from "../icons/OtherIcon"
import { useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"


export const SideBar = ({userName}:{userName:string}) => {
  const [userInput,setUserInput] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const onClickHandler = async ()=>{
    if(userInput.length>1){
      try{
        console.log(userInput)
        const response = await axios.get(`${BACKEND_URL}/brain/${userInput}`,{headers:{token:token}})
        
        if(response.status ==200){
          navigate(`brain/${userInput}`)
        }

      }catch(er){
          console.log(er)
      }


    }
  }

  const logout =()=>{
    localStorage.removeItem("token") 
    navigate("/")
  }

  return ( 
    <div className="border w-72 h-screen fixed pt-8">
      <div className="h-full w-full flex flex-col justify-between ">

          <div>
            <div className="flex justify-between items-center w-44 pl-4">
              <NavLink to={"."} className="flex">
              <BrainIcon size="lg" ></BrainIcon>
              <p className="text-xl font-bold">Second Brain</p>
              </NavLink>
            </div>

            <div className="pt-8 pl-4">
              
              <NavLink to={'twitter'}>
                <SideBarItem text="Twitter" icon={<TwitterIcon size="md"/>}></SideBarItem>
              </NavLink>
              <NavLink to={'youtube'}>
              <SideBarItem text="YouTube" icon={<YouttubeIcon size="md"/>}></SideBarItem>

              </NavLink>
              <NavLink to={'other'}>
              <SideBarItem text="Other" icon={<OtherIcon size="md"/>}></SideBarItem>

              </NavLink>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-8">
                  <p className="text-xs">Enter your friend share link!!</p>
              <div className="flex justify-between ">
                  <input type="text"  className="w-32 p-1" placeholder="paste link here" required onChange={(e)=>{e.preventDefault(); setUserInput(e.target.value)}}/>
                  <button className="p-1 bg-purple-200 text-purple-600 font-semibold rounded-md cursor-pointer" onClick={onClickHandler}>Submit</button>
                
              </div>

            </div>
            <div className="flex flex-row justify-between items-center">
              <div>
              <Button text="Logout" variants="primary" size="md" onClick={logout}></Button>
              </div>
              <div className="pl-4 flex flex-wrap">
                <p className="text-lg font-semibold pr-2">{userName}</p>
                <UserIcon size="lg"></UserIcon>
              </div>
            </div>
          </div>

      </div>
    </div>
  )
}
