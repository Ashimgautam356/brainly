import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"
import axios from "axios"


export  function useLink(currentState:boolean){
    const token = localStorage.getItem("token")
    const [shareAbleLink,setShareAbleLink] = useState({}) 
    
    
    useEffect(() => {
        const fetchLink = async () => {
          try {
            const response = await axios.post(
              `${BACKEND_URL}/brain/share`,
              { share: currentState },
              { headers: { token } }
            );
            setShareAbleLink(response.data);
          } catch (err) {
            console.error("Error fetching link:", err);
          }
        };
    
        fetchLink();
      }, [currentState, token]);
    return shareAbleLink
}