import{ Button} from "../components/Button"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Card } from "../components/Card"
import {SideBar} from '../components/SideBar'
import { CreateContentModal } from "../components/CreateContentModal"
import { useState } from "react"


export const DashBoard = () => {
    const [modalOpen ,setModalOpen] = useState(false)
  return (
    <>
    {/* sideBar */}
    <div>
        <SideBar></SideBar>

    </div>


        {/* body  */}
    <div className="relative bg-gray-600 ml-72 px-12 bg-gray-50 h-screen">
            {/* so called nav */}
        <div className="flex flex-row justify-between items-center py-12">
            <div className="text-3xl font-bold">
                All Notes
            </div>  
            <div className=" flex">
                <div className="mr-4">
                    <Button variants="secondary" size="md" text="Share" startIcon={<ShareIcon  size="md"/>}></Button >

                </div>
            <Button variants="primary" size="md" text="Add Content" startIcon={<PlusIcon  size="md" />} onClick={()=>{setModalOpen(true)}}></Button>
            </div> 
        </div>

        {/* contents */}
        <div className="flex gap-8">
            <Card title="first tweet" type="twitter" link="https://twitter.com/100xDevs/status/1864924651803328624?ref_src=twsrc%5Etfw"></Card>
            <Card title="first youtube" type="youtube" link="https://www.youtube.com/watch?v=Oo3qsxihXqY&ab_channel=HarkiratSingh"></Card>
        </div>
    </div>
        <CreateContentModal open={modalOpen} onClose={()=>{setModalOpen(false)}}></CreateContentModal>
    </>
  )
}
