import { SubmitHandler, useForm } from 'react-hook-form'
import{z} from 'zod'
import { Button } from '../Button'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { BACKEND_URL } from '../../config'
import { useNavigate } from 'react-router-dom'
 

const signupSchema  = z.object({
    userName:z.string({message:"must be type string"}).min(3,{message:"min length should be 3"}).max(10,{message:"max length should be 8"}),
    email:z.string({message:"must be type string"}).email({message:"invalid email format"}),
    password:z.string().min(8,{message:"minimum length should be 8"}).max(20).regex(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'), {
        message:
        'Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number'
    })
})

type FromFields = z.infer<typeof signupSchema>


export const SignupForm = () => {

    const navigate = useNavigate()


    const{register,handleSubmit,setError,formState:{errors}} = useForm<FromFields>({
        resolver:zodResolver(signupSchema)
    })
    const onSubmit:SubmitHandler<FromFields>= async(data)=>{
        const userName = data.userName
        const email = data.email
        const password = data.password

        try{
            const resp = await axios.post(`${BACKEND_URL}/signup`,{
                userName,
                email,
                password
        })
        
        if(resp.status==200){
            navigate("/")
        }
        }catch(err){
            if(axios.isAxiosError(err)){
                setError("root",{
                    message: err.response?.data?.message
                })
            }
            else{
                setError("root",{
                    message:"An unexpected error occurred"
                })
            }
        }
        
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col'>
        <input {...register("email")} placeholder='email:- jhondoe123@gmail.com' type="text" className='px-4 py-2 border rounded m-2' required={true}/>
        {errors.email && <p className='text-red-500 text-xs pl-4 ' >{errors.email?.message}</p>}
        <input {...register("userName")} placeholder='userName:- Jhon Doe' type="text" className='px-4 py-2 border rounded m-2' required={true}/>
        {errors.userName && <p className='text-red-500 text-xs pl-4 ' >{errors.userName?.message}</p>}

        <input {...register("password")} placeholder='password:- jhondoe123' type="password" className='px-4 py-2 border rounded m-2' required={true} />
        {errors.password && <p className='text-red-500 text-xs pl-4 w-64 ' >{errors.password?.message}</p>}

        {errors.root && <p className='text-red-500 text-sm pl-4 w-64 '>{errors.root.message}</p>}   
        <div className='flex justify-center w-full mt-8'>
            <Button variants='primary' text='Signup' size='md' type='submit' fullWidth={true} loading={false}></Button>       
        </div>  
    </form>
  )
}
