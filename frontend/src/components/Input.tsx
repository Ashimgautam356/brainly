export const Input = ({onChange,placeholder}:{onChange: ()=> void,placeholder:string})=>{
    return(<div>

        <input type="text" placeholder={placeholder} onChange={onChange} className='px-4 py-2 border rounded m-2' />

    </div>
    )
}