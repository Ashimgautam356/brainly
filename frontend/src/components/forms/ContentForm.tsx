import React from 'react'
import { Button } from '../Button'


enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter",
    Instagram = "instagram",
    Facebook = 'facebook',
    Other = 'other'
}

export const ContentForm = () => {
    const [type , setType] = React.useState(ContentType.Youtube)

  return (
    <form className='flex flex-col w-64'>
        <input type="text" placeholder='Title'  className='px-4 py-2 border rounded m-2'/>
        <input type="text" placeholder='Link'  className='px-4 py-2 border rounded m-2'/>
        
        <div className='w-full flex flex-col'>
            <p>Select Type</p>
            <div className='flex w-full flex-row gap-2 flex-wrap'>
            <p  className={type === ContentType.Facebook ? "bg-purple-600 text-white p-2 rounded-md cursor-pointer":"bg-purple-200 text-purple-600 p-2 rounded-md cursor-pointer"} onClick={()=>{setType(ContentType.Facebook)}}>FaceBook</p>

            <p  className={type === ContentType.Instagram? "bg-purple-600 text-white p-2 rounded-md cursor-pointer":"bg-purple-200 text-purple-600 p-2 rounded-md cursor-pointer"} onClick={()=>{setType(ContentType.Instagram)}}>Instagram</p>
            
            <p  className={type === ContentType.Twitter? "bg-purple-600 text-white p-2 rounded-md cursor-pointer":"bg-purple-200 text-purple-600 p-2 rounded-md cursor-pointer"} onClick={()=>{setType(ContentType.Twitter)}}>Twitter</p>

            <p  className={type === ContentType.Youtube? "bg-purple-600 text-white p-2 rounded-md cursor-pointer":"bg-purple-200 text-purple-600 p-2 rounded-md cursor-pointer"} onClick={()=>{setType(ContentType.Youtube)}}>Youtube</p>

            <p  className={type === ContentType.Other? "bg-purple-600 text-white p-2 rounded-md cursor-pointer":"bg-purple-200 text-purple-600 p-2 rounded-md cursor-pointer"} onClick={()=>{setType(ContentType.Other)}}>Other</p>

            </div>
        </div>

        <div className='mt-8 w-full'>
        <Button type='submit' text='Submit' variants='primary' size='md' fullWidth={true}></Button>
        </div>
    </form>
  )
}
