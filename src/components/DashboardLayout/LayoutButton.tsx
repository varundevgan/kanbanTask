import React, { useState } from 'react'
import { HiOutlineViewBoards } from "react-icons/hi";
import { CiCircleList } from "react-icons/ci";

const LayoutButton = () => {

    const [layout, setLayout] = useState<string>('Board')

    const layoutType = (type:string) => {
        setLayout(type)
    }

  return (
    <div className='flex items-center border-2 border-gray-300 rounded-lg'>
      <button onClick={()=>layoutType('Board')} className={`relative flex items-center  rounded-l-lg font-medium h-9 border-r-2 cursor-pointer border-gray-300 px-2 gap-2 ${layout === 'Board' ? 'bg-[#eaf2fc] text-black after:content-[""] after:absolute after:left-[40%] after:bottom-[-1px] after:h-[2px] after:w-6 after:bg-blue-500 after:rounded-lg ' : 'text-gray-400'} `}>
            <HiOutlineViewBoards className={`${layout === 'Board' ? 'text-blue-600' : ''} text-lg`} />
            <p>Board</p>
      </button>
      <button onClick={()=>layoutType('List')} className={`relative flex items-center rounded-r-lg  ${layout === 'List' ? 'bg-[#eaf2fc] text-black after:content-[""] after:absolute after:left-[40%] after:bottom-[-1px] after:h-[2px] after:w-6 after:bg-blue-500 after:rounded-lg' : 'text-gray-400'} font-medium  gap-2 cursor-pointer h-9 px-2 pr-3 ${layout === 'List' ? '' : ''}`}>
            <CiCircleList className={`${layout === 'List' ? 'text-blue-600' : ''} text-lg`} />
            <p>List</p>
      </button>
    </div>
  )

  
}

export default LayoutButton
