import axios from "axios";
import { useEffect, useState } from "react";




interface UserId {
    _id:string,
    userName:string
  }
  
export interface ResposeType{
    _id:string,
    link:string,
    type: "youtube"| "twitter"| "other",
    title:string,
    date:Date,
    userId: UserId
  
  }

export function useContent():ResposeType[]{
    const [contents,setContents] = useState([]);

    const token = localStorage.getItem("token")
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/content/allContent`, {
            headers: { token },
          }).then((response)=> setContents(response.data.data))
    },[])
    return contents
}