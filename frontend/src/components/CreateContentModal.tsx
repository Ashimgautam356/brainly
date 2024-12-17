import { useNavigate } from 'react-router-dom'
import { CrossIcon } from '../icons/CrossIcon'
import { ContentForm } from './forms/ContentForm'


export const CreateContentModal = ({open,onClose}:{open:boolean,onClose:()=>void}) => {

    const navigate= useNavigate()
  return (
    <div >
        {open && <div>
            <div className='w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-80 flex justify-center'>

            </div>


            <div className='w-screen h-screen fixed top-0 left-0  flex justify-center'>
                <div className=' flex flex-col justify-center'>
                <span className='bg-white opacity-100  p-4 rounded max-w-80'>
                    <div className='flex justify-between items-center  '>
                        <p className='font-medium text-xl'>Add Content</p>
                        <div onClick={()=>{

                            onClose()
                            navigate('/dashboard')

                        }} className='cursor-pointer'>
                            <CrossIcon size='md'></CrossIcon>
                        </div>
                    </div>
                    <div className='mt-4 flex justify-center'>
                        <ContentForm onClick={onClose}></ContentForm>
                    </div>
                </span>
            </div>
        </div>
        </div>
        }
    </div>
  )
}

