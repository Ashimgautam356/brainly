import { TickIcon } from "../icons/TickIcon"

export interface PopupProps{
    title:string,
    variant:"success"|"plane"
}

const divTypes ={
    "success":"bg-green-600 text-white font-semibold text-2xl",
    "plane":"bg-indigo-300 text-white font-semibold text-2xl"
}

const defaultStyle = "relative py-5 px-10 min-w-80  flex justify-center items-center mt-8 rounded-lg transition-all duration-500"


export const Popup = ({title,variant}:PopupProps)=>{
return (
    <div className= "absolute top-0  right-0 h-screen w-screen  ">
        <div className="relative flex justify-center">
                <div className= {`${defaultStyle} ${divTypes[variant]}`}>
                    
                    {title}
                    {variant=="success" && <div className="pl-4"><TickIcon size="md" /></div>}
                </div>
        </div>
    </div>
  )
}
