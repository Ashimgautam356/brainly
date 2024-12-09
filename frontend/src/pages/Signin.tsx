import { Link } from 'react-router-dom'

import { SigninForm } from '../components/forms/SigninForm'

export const Signin = () => {
  return (
    <div className='flex justify-center items-center bg-gray-200 w-screen h-screen'>
        <div className='bg-white min-w-48 rounded-lg border p-8 h-96 flex flex-col justify-between items-center'>
            <div className='flex justify-center '>
                <h1 className='text-3xl font-semibold text-purple-600'>Login</h1>
            </div>
            <div className='mt-8'>

                <SigninForm></SigninForm>
            </div>
            <div className=''>
                <p>don't have the account?<span><Link to={'/signup'} className='underline text-blue-500'>create account</Link></span></p>
            </div>
        </div>
    </div>
  )
}
