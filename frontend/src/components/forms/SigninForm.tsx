import { BACKEND_URL } from '../../config'
import {  useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import {z} from 'zod'
import { Button } from '../Button'
import React from 'react'
import { Popup } from '../Popup'

const signinSchema  = z.object({
    email:z.string({message:"should be string"}).email({message:"should be in a email format"}),
    password:z.string().min(8,{message:"minimum length should be 8"}).max(20).regex(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'), {
        message:
        'Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number'
    })
})

type FromFields = z.infer<typeof signinSchema>

export const SigninForm = () => {
    
    const navigate = useNavigate()
    const [isPopupVisible, setPopupVisible] = React.useState(false);


    const{register,handleSubmit,formState:{errors,isSubmitting},setError} = useForm<FromFields>()

    const onSubmit:SubmitHandler<FromFields>= async(data)=>{
        const email = data.email as unknown as string
        const password = data.password

        try{
            const resp = await axios.post(`${process.env.VITE_API_URL}/signin`,{
                email:email,
                password:password
        })
        
            if(resp.status==200){
                const jwt = resp.data.token
                localStorage.setItem("token",jwt)
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
            })
            }
        }
         
    }
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col'>
        <input {...register("email")} placeholder='email:- jhondoe123@gmail.com' type="text" className='px-4 py-2 border rounded m-2' required={true}/>
        {errors.email && <p className='text-red-500 text-xs pl-4 ' >{errors.email?.message}</p>}

        <input {...register("password")} placeholder='password:- jhondoe123' type="password" className='px-4 py-2 border rounded m-2' required={true} >
        </input>
        {errors.password && <p className='text-red-500 text-xs pl-4 w-64 ' >{errors.password?.message}</p>}

            {errors.root && <p className='text-red-500 text-sm pl-4 w-64 '>{errors.root.message}</p>}   
        <div className='flex flex-col justify-center w-full mt-8 '>
            <Button variants='primary' text='Login' size='md' type='submit' fullWidth={true} loading={isSubmitting}></Button>    
        </div>        
</form>
{
    isPopupVisible && <Popup title={"Loged in "} variant='success'></Popup>
}
</>
  )
}
