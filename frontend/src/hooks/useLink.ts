import { useEffect, useState } from "react"
import axios from "axios"


export  function useLink(currentState:boolean){
    const token = localStorage.getItem("token")
    const [shareAbleLink,setShareAbleLink] = useState({}) 
    
    
    useEffect(() => {
        const fetchLink = async () => {
          try {
            const response = await axios.post(
              `${process.env.VITE_API_URL}/brain/share`,
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