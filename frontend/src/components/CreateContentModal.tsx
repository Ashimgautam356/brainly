import React from 'react'
import { CrossIcon } from '../icons/CrossIcon'
import { Button } from './Button'
import { Input } from './Input'
import axios from 'axios'
import { BACKEND_URL } from '../Config'


export const CreateContentModal = ({open,onClose}:{open:boolean,onClose:()=>void}) => {
    const titleRef = React.useRef<HTMLInputElement>()
    const linkRef = React.useRef<HTMLInputElement>()

    const addContent = async()=>{
        const title = titleRef.current?.value
        const link = linkRef.current?.value
        const type = "youtube"
        const token = localStorage.getItem("token")
        const response = axios.post(`${BACKEND_URL}/postContent`,{
            title,
            link,
            type
        },{
            headers:{
                token: token
            }
        })

        respo
    }

  return (
    <div >
        {open && <div>
            <div className='w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-80 flex justify-center'>

            </div>


            <div className='w-screen h-screen fixed top-0 left-0  flex justify-center'>
                <div className=' flex flex-col justify-center'>
                <span className='bg-white opacity-100  p-4 rounded'>
                    <div className='flex justify-between items-center w-64'>
                        <p className='font-medium'>Add Content</p>
                        <div onClick={onClose} className='cursor-pointer'>
                        <CrossIcon size='md'></CrossIcon>
                        </div>
                    </div>
                    <div>
                        <Input reference={titleRef} placeholder='Title' ></Input>
                        <Input reference={linkRef} placeholder='Link' ></Input>
                    </div>
                    <div className=' flex justify-center'>

                    <Button size='md' variants='primary' text="Submit" onClick={addContent}></Button>
                    </div>
                </span>
            </div>
        </div>
        </div>
        }
    </div>
  )
}

