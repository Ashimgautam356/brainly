import React, { useState } from 'react'
import { CrossIcon } from '../icons/CrossIcon'
import { Button } from './Button'
import { useLink } from '../hooks/useLink'

interface LinkData{
    link?:string,
    message?:string
}


export const Sharelink = ({open,onClose}:{open:boolean,onClose:()=>void}) => {
    const[isSharing,setIsSharing] = useState(true)
    const [link,setLink] = useState<LinkData>({})


    const fetchedLink = useLink(isSharing);

  React.useEffect(() => {
    setLink(fetchedLink);
  }, [fetchedLink]);

  function handleClick() {
    setIsSharing((prevIsSharing) => !prevIsSharing);
  }

  return (
    <>
        {open && <div>
            <div className= "absolute top-0  right-0 h-screen w-screen  ">
                    <div className="relative flex justify-center">
                            <div className= "relative py-5 px-10 min-w-80  flex flex-col mt-8 rounded-lg transition-all duration-500 bg-gray-700 text-white font-semibold text-2xl">
                                <div  className='cursor-pointer flex flex-row-reverse justify-between'>
                                    <div onClick={onClose}>
                                        <CrossIcon size='lg'></CrossIcon>
                                    </div>
                                    <div>
                                        <h1>Share link</h1>
                                    </div>
                                </div>
                                {
                                        isSharing ? <p className='p-1 w-20  text-xs border border-red-500 rounded-md cursor-pointer text-white bg-red-500' onClick={handleClick}>Remove Link</p>:<p className='p-1 w-20 text-xs border border-green-500 rounded-md cursor-pointer text-white bg-green-500' onClick={handleClick}>Create link</p>
                                    }
                                <div className='flex justify-between items-center mt-4'>
                                    {
                                        link.link? <p className='text-sm text-white'>{link.link}</p>:<p className='text-sm'>{link.message}</p>
                                    }
                                    
                                </div>
                            </div>
                    </div>
                </div>   
        </div>
        }
    </>
  )
}
