import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent(){
    const [contents,setContents] = useState([]);

    const token = localStorage.getItem("token")
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/content/allContent`, {
            headers: { token },
          }).then((response)=> setContents(response.data.data))
    },[])

    return contents
}