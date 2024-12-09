// import { zodResolver } from '@hookform/resolvers/zod'
// import {SubmitHandler, useForm} from 'react-hook-form'
// import {z} from 'zod'

// const schema = z.object({
//     email:z.string({message:"you know it , !!!"}).email(),
//     password:z.string().min(8,{message:"from zod"})
// })

// type FormFeilds = z.infer<typeof schema>

// type FromFields = {
//     userName:string,
//     email:string,
//     password:string
// }



// export const Form = ()=>{
//     const {register,handleSubmit,setError,formState:{errors,isSubmitting}} = useForm<FromFields>({
//         resolver:zodResolver(schema)
//     })

//     const onSubmit: SubmitHandler<FromFields> = async (data)=>{
//      await new Promise((resolve)=> setTimeout(resolve,1000)) 
//         console.log(data)
//     }

//     return(
//         <form onSubmit={handleSubmit(onSubmit)} >
//             <input {...register("email",{
//                 required:"must required email"
//             })} type='text'placeholder='Email' />
//             {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

//             <input {...register("password")} type='password'placeholder='Password' />
//             {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

//             <button type='submit' disabled ={isSubmitting}>{isSubmitting?"loading":"button"}</button>
//         </form>
//     )
// }



// import React from 'react'
// import { SubmitHandler, useForm } from 'react-hook-form'
// import { data } from 'react-router-dom'
// import { Button } from '../Button'


// export type FormInputs = {
//     userName:string,
//     email:string,
//     password:string

// }


// export const Form = () => {
//      const {register,handleSubmit} = useForm<FormInputs>()

//     const onSubmit:SubmitHandler<FormInputs>  = (data)=>{
//         console.log(data)
//     }
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//         <input {...register("email")} type="text" placeholder='jhonDoe123@gmail.com' />
//         <input {...register("userName")} type="text" placeholder='Jhon Doe' />
//         <input {...register("password")} type="password" placeholder='jhoneDoe' />
//         <Button type='submit' variants='primary' size='md' text='Submit'></Button>
//     </form>
//   )
// }





