import React from 'react'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import axios from 'axios'
import { BACKEND_URL } from '../Config'
import { useNavigate } from 'react-router-dom'


export const Signup = () => {
    const userNameRef = React.useRef<HTMLInputElement>()
    const passwordRef = React.useRef<HTMLInputElement>()
    const navigate = useNavigate()
    const signup = async()=>{
        const userName = userNameRef.current?.value
        const password = passwordRef.current?.value
        const resp = await axios.post(`${BACKEND_URL}/signup`,{
                userName,
                password
        })
        
        if(resp.status==200){
            navigate("/signin")
        }
    }
  return (
    <div className='flex justify-center items-center bg-gray-200 w-screen h-screen'>
        <div className='bg-white min-w-48 rounded border p-8'>
            <Input reference={userNameRef} placeholder='UserName'></Input>
            <Input reference={passwordRef} placeholder='passwordRef'></Input>

            <div className='flex justify-center mt-4'>
                <Button variants='primary' text='Signup' size='md' fullWidth={true} loading={false} onClick={signup}></Button>
            </div>
            
        </div>
    </div>
  )
}
