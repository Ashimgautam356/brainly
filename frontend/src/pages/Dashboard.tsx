import{ Button} from "../components/Button"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Card } from "../components/Card"
import {SideBar} from '../components/SideBar'
import { CreateContentModal } from "../components/CreateContentModal"
import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"


interface UserId {
    _id:string,
    userName:string
}

interface ResposeType{
    _id:string,
    link:string,
    type: "youtube"| "twitter"|"instagram"| "facebook"| "other",
    title:string,
    date:Date,
    userId: UserId

}

export const DashBoard = () => {
    const [modalOpen ,setModalOpen] = useState(false)
    const [userContent,setUserContent] =useState([])
    const token = localStorage.getItem("token")
    
    useEffect(() => {
        const fetchContent = async () => {
          try {
            const response = await axios.get(`${BACKEND_URL}/content/allContent`, {
              headers: { token },
            });
            if(response.status==200){
                setUserContent(response.data.data);
            }
            // Access the nested data structure
          } catch (error) {
            console.error("Failed to fetch content:", error);
          }
        };
      
        fetchContent();
      }, [token]);

  return (
    <>
    {/* sideBar */}
    <div>
        <SideBar userName={userContent[0]?.userId?.userName}></SideBar>

    </div>


        {/* body  */}
    <div className="relative bg-gray-600 ml-72 px-12 pb-8 bg-gray-50 min-h-screen">
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
        <div className="flex gap-8 flex-row flex-wrap ">
            {
                userContent?.map((contents:ResposeType)=>{
                    
                    return(
                        <Card date={contents?.date} title={(contents?.title)} type={(contents?.type)} link={contents?.link} key={contents?._id}></Card>
                    )
                })
            }
            {/* <Card title="first tweet" type="twitter" link="https://twitter.com/100xDevs/status/1864924651803328624?ref_src=twsrc%5Etfw"></Card>
            <Card title="first youtube" type="youtube" link="https://www.youtube.com/watch?v=Oo3qsxihXqY&ab_channel=HarkiratSingh"></Card> */}
        </div>
    </div>
        <CreateContentModal open={modalOpen} onClose={()=>{setModalOpen(false)}}></CreateContentModal>
    </>
  )
}
