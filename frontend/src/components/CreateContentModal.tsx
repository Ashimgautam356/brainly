import React from 'react'
import { CrossIcon } from '../icons/CrossIcon'
import { Button } from './Button'
import { Input } from './Input'
export const CreateContentModal = ({open,onClose}:{open:boolean,onClose:()=>void}) => {
    const titleRef = React.useRef()
    const linkRef = React.useRef()

  return (
    <div >
        {open && <div className='w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center'>
            <div className='flex flex-col justify-center'>
                <span className='bg-white opacity-100  p-4 rounded'>
                    <div className='flex justify-between items-center w-64'>
                        <p className='font-medium'>Add Content</p>
                        <div onClick={onClose} className='cursor-pointer'>
                        <CrossIcon size='md'></CrossIcon>
                        </div>
                    </div>
                    <div>
                        <Input ref={titleRef} placeholder='Title' ></Input>
                        <Input ref={linkRef} placeholder='Link' ></Input>
                    </div>
                    <div className=' flex justify-center'>

                    <Button size='md' variants='primary' text="Submit"></Button>
                    </div>
                </span>
            </div>
        </div>
        }
    </div>
  )
}

