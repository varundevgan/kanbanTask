import React, { type JSX } from 'react'
import Button from './Features/Button'
import Input from './Features/Input'
import LayoutButton from './DashboardLayout/LayoutButton'


interface ButtonType{
    id:number,
    button_name: string,
    border:string,
    text:string
}

const buttons : ButtonType[] = [
    {
        id:1,
        button_name: 'LuArrowDownUp',
        border: 'solid',
        text: 'Sort by'
    },
    {
        id:2,
        button_name: 'HiOutlinePlusCircle',
        border: 'dashed',
        text: 'Assigned To'
    },
    {
        id:3,
        button_name: 'HiOutlinePlusCircle',
        border: 'dashed',
        text: 'Severity'
    },
    {
        id:4,
        button_name: 'HiOutlinePlusCircle',
        border: 'dashed',
        text: 'Status'
    },
    {
        id:5,
        button_name: 'HiOutlinePlusCircle',
        border: 'dashed',
        text: 'Pentest'
    },
    {
        id:6,
        button_name: 'HiOutlinePlusCircle',
        border: 'dashed',
        text: 'Target'
    }
]

const Navbar = () => {
  return (
    <nav className='w-full'>
      <h1 className='font-[500] tracking-wide text-3xl'>Vulnerabilities</h1>
      <div className='flex items-center justify-between w-full mt-4 gap-2'>
        <div className='flex items-center w-full gap-2'>
            <Input />
            <div className='lg:flex items-center gap-2 hidden flex-wrap'>
                {buttons.map((button)=>(
                <Button key={button.id} button_name={button.button_name} border={button.border} text={button.text} />
                 ))}
            </div>
        </div>
        <div>
            <LayoutButton />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
