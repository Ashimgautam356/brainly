import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"
import axios, { AxiosResponse } from "axios"


export  function useLink(id:string,currentState:boolean){
    const token = localStorage.getItem("token")
    console.log(currentState)
    const [shareAbleLink,setShareAbleLink] = useState({}) 

    currentState?getlink():removelink()

     function getlink(){
        useEffect(()=>{
            try{
                const link =  axios.post(`${BACKEND_URL}/brain/share`,{
                    share:currentState
                    
                },{
                    headers:{
                        token:token
                    }
                }).then(res=> setShareAbleLink(res.data))
        
            }catch(err){
                console.log(err)
            }
        },[])
        
    }
     function removelink(){
        useEffect(()=>{
            try{
                const link = axios.post(`${BACKEND_URL}/brain/share`,{
                    share:currentState
                    
                },{
                    headers:{
                        token:token
                    }
                }).then(res=> setShareAbleLink(res.data))
        
            }catch(err){
                console.log(err)
            }
        },[])
        
    }
    
    return shareAbleLink
}