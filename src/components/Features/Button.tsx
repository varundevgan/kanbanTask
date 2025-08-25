import React from 'react'
import { iconMap } from './icons'

interface Button{
    button_name: string,
    border:string,
    text:string
}

const Button = ({button_name, border,text}: Button) => {
    const Icon = iconMap[button_name]
  return (
    <button className={`px-3 h-9 rounded-lg flex items-center gap-2 border-2 border-gray-300 border-${border} shadow-sm cursor-pointer truncate`}>
        <Icon />
        <p>{text}</p>
    </button>
  )
}

export default Button
