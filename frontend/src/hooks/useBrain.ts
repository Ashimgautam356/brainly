import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";


export async function useBrain(prams:string){
    const [resposneData,setResponseData] = useState({})
    const token = localStorage.getItem("token")
    useEffect(()=>{
        const runFun  = async ()=>{
            try{
                const response = await axios.get(`${BACKEND_URL}/brain/${prams}`,{headers:{token:token}})
                if(response.status ==200){
                    setResponseData(response.data)
                }
            }
            catch(err){
                console.log(err)
            }

        }

        runFun()
        
    },[prams])
    
    return resposneData
}