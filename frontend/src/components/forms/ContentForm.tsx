import React from 'react'
import { Button } from '../Button'
import {z} from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { BACKEND_URL } from '../../config'
import { useNavigate } from 'react-router-dom'
import { Popup } from '../Popup'



enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter",
    Other = 'other'
}

const ContentSchema  = z.object({
  title: z.string().min(3,{message:"should be at least 3 character"}),
  link:z.string(),
})

type ContentsType = z.infer<typeof ContentSchema>


export const ContentForm = () => {

    const [isPopupVisible, setPopupVisible] = React.useState(false);
    const navigate = useNavigate()

  const {register,handleSubmit,formState:{errors},setError} = useForm<ContentsType>({
    resolver:zodResolver(ContentSchema)
  })
    const [userType , setUserType] = React.useState(ContentType.Youtube)
    
    const addContent:SubmitHandler<ContentsType> = async(data)=>{
      const title = data.title
      const link = data.link
      const type = userType
      const token = localStorage.getItem("token") as string
      const currentDate = new Date()
      console.log(typeof currentDate)
      try{
        const response = await axios.post(`${BACKEND_URL}/content/postContent`,{
          title,
          link,
          type,
          date:currentDate
        },{
          headers:{
            "token":token
          }
        })

        if(response.status==200){
          setPopupVisible(true)
          
          setTimeout(()=>{
            setPopupVisible(false)
            navigate("/dashboard")
        },2000)
        }

      }catch(err){
        if (axios.isAxiosError(err)) {

          setError("root",{
              message:err.response?.data?.message
          })
        } else {
        setError("root",{
          message:"An unexpected error occurred"
        })}
      }      
    }

  return (
    <>

    <form className='flex flex-col w-64' onSubmit={handleSubmit(addContent)}>
        <input {...register("title")} type="text" placeholder='Title'  className='px-4 py-2 border rounded m-2'/>
        {errors.title && <p className='text-red-500 text-xs pl-4 ' >{errors.title?.message}</p>}
        
        <input {...register("link")} type="text" placeholder='Link'  className='px-4 py-2 border rounded m-2'/>
        {errors.link && <p className='text-red-500 text-xs pl-4 ' >{errors.link?.message}</p>}
        
        <div className='w-full flex flex-col'>
            <p>Select Type</p>
            <div className='flex w-full flex-row gap-2 flex-wrap'>
            
            <p  className={userType === ContentType.Twitter? "bg-purple-600 text-white p-2 rounded-md cursor-pointer":"bg-purple-200 text-purple-600 p-2 rounded-md cursor-pointer"} onClick={()=>{setUserType(ContentType.Twitter)}}>Twitter</p>

            <p  className={userType === ContentType.Youtube? "bg-purple-600 text-white p-2 rounded-md cursor-pointer":"bg-purple-200 text-purple-600 p-2 rounded-md cursor-pointer"} onClick={()=>{setUserType(ContentType.Youtube)}}>Youtube</p>

            <p  className={userType === ContentType.Other? "bg-purple-600 text-white p-2 rounded-md cursor-pointer":"bg-purple-200 text-purple-600 p-2 rounded-md cursor-pointer"} onClick={()=>{setUserType(ContentType.Other)}}>Other</p>

            </div>
        </div>

        <div className='mt-8 w-full'>

        <Button type='submit' text='Submit' variants='primary' size='md' fullWidth={true}></Button>
        </div>
    </form>
    {
    isPopupVisible && <Popup title={"content has been added"} variant='plane'></Popup>
    }
    </>
  )
}
