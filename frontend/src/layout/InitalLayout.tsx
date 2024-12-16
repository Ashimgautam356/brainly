import {useState} from 'react'
import { SideBar } from '../components/SideBar'
import { Sharelink } from "../components/Sharelink"
import { useNavigate,Outlet } from "react-router-dom"
import { useContent } from "../hooks/useContent"
import { CreateContentModal } from "../components/CreateContentModal"





export const InitalLayout = () => {
    const [modalOpen ,setModalOpen] = useState(false)
    const [sharelink,setSharelink] = useState(false)
    const token = localStorage.getItem("token")

    const navigate = useNavigate()

    if(!token){
        navigate('/')
    }
    const userContent = useContent()

    console.log(userContent)

    const outletContext = {
        setSharelink,
        setModalOpen
    }

  return (
    <>
        <div>
            <SideBar userName={userContent[0]?.userId?.userName}></SideBar>

        </div>


        <div className="relative bg-gray-600 ml-72 px-12 pb-8 bg-gray-50 min-h-screen">
            {/* so called nav */}

            <Outlet context={outletContext} ></Outlet>

        </div>

    <CreateContentModal open={modalOpen} onClose={()=>{setModalOpen(false)}}></CreateContentModal>
    <Sharelink open={sharelink} onClose={()=>{setSharelink(false)}}></Sharelink>
    </>
  )
}
