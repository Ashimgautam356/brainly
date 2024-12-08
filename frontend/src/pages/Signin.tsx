import React from 'react'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { BACKEND_URL } from '../Config'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Signin = () => {
    const userNameRef = React.useRef<HTMLInputElement>()
    const passwordRef = React.useRef<HTMLInputElement>()
    const navigate = useNavigate()
    const sigin = async()=>{
        const userName = userNameRef.current?.value
        const password = passwordRef.current?.value
        const resp = await axios.post(`${BACKEND_URL}/signin`,{
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
        <div className='bg-white min-w-48 rounded-lg border p-8 h-96 flex flex-col justify-between items-center'>
            <div className='flex justify-center '>
                <h1 className='text-3xl font-semibold text-purple-600'>Login</h1>
            </div>
            <div className=''>

                <Input reference={userNameRef} placeholder='UserName'></Input>
                <Input reference={passwordRef} placeholder='password'></Input>
            </div>

            <div className='flex justify-center w-full'>
                <Button variants='primary' text='Login' size='md' fullWidth={true} loading={false} onClick={sigin}></Button>
            </div>
            <div className=''>
                <p>don't have the account?<span><Link to={'/signup'} className='underline text-blue-500'>create account</Link></span></p>
            </div>
        </div>
    </div>
  )
}
