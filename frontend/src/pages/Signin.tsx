import { Input } from '../components/Input'
import { Button } from '../components/Button'

export const Signin = () => {
  return (
    <div className='flex justify-center items-center bg-gray-200 w-screen h-screen'>
        <div className='bg-white min-w-48 rounded border p-8'>
            <Input placeholder='UserName'></Input>
            <Input placeholder='password'></Input>

            <div className='flex justify-center mt-4'>
                <Button variants='primary' text='Signin' size='md' fullWidth={true} loading={true}></Button>
            </div>
            
        </div>
    </div>
  )
}
