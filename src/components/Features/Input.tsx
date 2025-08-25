import { useState } from 'react'
import { IoSearch } from "react-icons/io5";

const Input = () => {
    const [inputClicked, setInputClicked] = useState(false)
  return (
   <div className='relative h-9 px-3 border-2 border-gray-300 rounded-lg flex items-center gap-2 shadow-2xl'>
        <IoSearch className='cursor-auto lg:cursor-pointer xl:cursor-auto' onClick={()=>setInputClicked(prev=>!prev)} />
        <input 
            type="text" 
            name='search'
            placeholder='Search by issue name...'
            className='outline-none xl:block lg:hidden block w-full'
        />
        {
            inputClicked && (
            <div className='absolute lg:flex items-center px-3 h-9 top-[110%] -left-1 w-50 border-2 border-gray-300 rounded-lg hidden xl:hidden'>
                <input 
                type="text" 
                name='search'
                placeholder='Search by issue name...'
                className='outline-none'
                />
            </div>
            )
        }
   </div>
  )
}

export default Input
