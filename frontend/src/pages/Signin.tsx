import React from 'react'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { BACKEND_URL } from '../Config'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Signin = () => {
    const userNameRef = React.useRef<HTMLInputElement>()
    const passwordRef = React.useRef<HTMLInputElement>()
    const navigate = useNavigate()
    const sigin = async()=>{
        const userName = userNameRef.current?.value
        const password = passwordRef.current?.value
        const resp = await axios.post(`${BACKEND_URL}api/v1/signin`,{
                userName,
                password
        })
        
        if(resp.status==200){
            const jwt = resp.data.token
            localStorage.setItem("token",jwt)
            navigate("/dashboard")
        } 
    }
  return (
    <div className='flex justify-center items-center bg-gray-200 w-screen h-screen'>
        <div className='bg-white min-w-48 rounded border p-8'>
            <Input reference={userNameRef} placeholder='UserName'></Input>
            <Input reference={passwordRef} placeholder='password'></Input>

            <div className='flex justify-center mt-4'>
                <Button variants='primary' text='Signin' size='md' fullWidth={true} loading={false} onClick={sigin}></Button>
            </div>
            
        </div>
    </div>
  )
}
