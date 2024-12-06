import { ReactElement } from "react"

interface ButtonProps{
  variants:"primary"|"secondary",
  text: string,
  startIcon?:ReactElement,
  size:"sm"|"md"|"lg"
  onClick?:()=>void,
  fullWidth?:boolean,
  loading?:boolean,
}

const variantsStyle={
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-200 text-purple-600"
}
const sizeStyle={
    "sm":"px-4 py-2",
    "md":"px-6 py-3",
    "lg":"px-8 py-4"
}
const defalutStyle = "flex justify-center items-center rounded-md"



export const Button = ({variants,text,startIcon,size,onClick,fullWidth,loading}:ButtonProps) => {
  return (
    <button className={`${defalutStyle} ${variantsStyle[variants]} ${sizeStyle[size]} ${fullWidth? " w-full flex justify-center items-center":""}  ${loading? " opacity-45":""}`} onClick={onClick} disabled={loading}>
        {startIcon?<div className="pr-2">{startIcon}</div>:null}
        {text}
    </button>
  )
}
