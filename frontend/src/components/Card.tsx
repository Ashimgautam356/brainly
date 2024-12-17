import axios from "axios"
import { DeleteIcon } from "../icons/DeleteIcon"
import OtherIcon from "../icons/OtherIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { TwitterIcon } from "../icons/TwitterIcon"
import { YouttubeIcon } from "../icons/YouttubeIcon"
import { BACKEND_URL } from "../config"
import React from "react"
import { Popup } from "./Popup"


interface CardProps{
  title: string,
  link: string,
  type:  "youtube"| "twitter"| "other",
  tags?: [string], 
  date: Date,
  id:string
}

const iconTypeStyle:any ={
  "youtube":<YouttubeIcon size="sm"></YouttubeIcon>,
  "twitter":<TwitterIcon size="sm"></TwitterIcon>,
  "other":<OtherIcon size="sm"></OtherIcon>
}

export const Card = ({title,link,type,date,id}:CardProps) => {
  const [isPopupVisible, setPopupVisible] = React.useState(false);


  const token = localStorage.getItem("token")
  
  const delteitem = async(id:string)=>{
    try{
      const response = await axios.delete(`${BACKEND_URL}/content/delete/${id}`,{
        headers:{token}
      })

      if(response.status==200){
        setPopupVisible(true)
          
          setTimeout(()=>{
            setPopupVisible(false)
        },2000)
      }

    }catch(err){
      if (axios.isAxiosError(err)) {

        alert(err.response?.data?.message)
      } else {

        alert("an expected error occured")
      }
    }
    
  }

  
  // extracting the link id from the user's url
  const orginalLink = link as string
  const getVideoId = (link: string): string | null => {
    const match = link.match(/https:\/\/youtu\.be\/([^?]+)/); 
    return match ? match[1] : null; 
  };


  const videoId = type === "youtube" ? getVideoId(orginalLink) : null;

  const paresedDate= new Date(date);

  const month = paresedDate?.getMonth()+1
  const day = paresedDate?.getDate()
  const year = paresedDate?.getFullYear()


  if(type === 'twitter'){
    link = link.replace("x.com","twitter.com")
  }

  return (
    <>
    <div className=" relative p-4 min-h-[25rem] bg-white flex flex-col justify-between rounded-lg border w-72 border-gray-200">
      <div>      
        <div className="flex flex-row justify-between">
          <div className=" flex items-center text-md">
            <div className="text-gray-500 pr-2">
              {iconTypeStyle[type]}
            </div>
            <div className="font-medium text-medium">
              {title}
            </div>
          </div>
          <div className=" flex items-center">
            <div className="pr-2 text-gray-500">
            <ShareIcon size="sm"></ShareIcon>
            </div>

            <div className="text-gray-500">
              <div onClick={()=>{delteitem(id)}} className="cursor-pointer">
                <DeleteIcon size="sm"></DeleteIcon>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 relative max-h-72 overflow-hidden ">
          {
            type == "youtube" && <iframe 
            className="w-full" 
            src={`https://www.youtube.com/embed/${videoId}`} 
            title="video" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen>

            </iframe>
          }
        

        {type == "twitter" && <blockquote className="twitter-tweet">
            <a href={link}></a> 
          </blockquote> }


        {
          type =="other" && <a href={link}></a>
        }

        
          
        </div>

        <div className="flex mt-4 ">
            <p className="bg-purple-200 text-purple-600 rounded-lg px-2 text-sm font-medium">#{type}</p>
        </div>
      </div>
      <div className="flex mt-5">
        <p className="text-gray-500 text-normal">{`Added on ${day?day:""}/${month?month:""}/${year?year:""}`}</p>
      </div>
        
    </div>
    {
    isPopupVisible && <Popup title={"content has been deleted"} variant='plane'></Popup>
    }
    </>
  )
}
