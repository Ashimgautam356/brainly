import { ReactElement } from "react"

interface ButtonProps{
  variants:"primary"|"secondary",
  text: string,
  startIcon?:ReactElement,
  size:"sm"|"md"|"lg"
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

export const Button = ({variants,text,startIcon,size}:ButtonProps) => {
  return (
    <button className={`${defalutStyle} ${variantsStyle[variants]} ${sizeStyle[size]} `}>
        {startIcon?<div className="pr-2">{startIcon}</div>:null}
        {text}
    </button>
  )
}
