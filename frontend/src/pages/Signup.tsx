
import { Link } from 'react-router-dom'
import { SignupForm } from '../components/forms/SignupForm'


export const Signup = () => {

    
  return (
    <div className='flex justify-center items-center bg-gray-200 w-screen h-screen'>
        <div className='bg-white min-w-48 rounded-lg border p-8 min-h flex flex-col justify-between items-center'>
            <div className='flex justify-center '>
                <h1 className='text-3xl font-semibold text-purple-600'>Signup</h1>
            </div>
            <div className='mt-8'>

                <SignupForm></SignupForm>
            </div>
            <div className=''>
                <p>Have an Account?<span><Link to={'/'} className='underline text-blue-500'>Login</Link></span></p>
            </div>
            
        </div>
    </div>
  )
}
