import { useState } from 'react'
import { iconMap } from './icons'
import { useDispatch } from 'react-redux'
import { sortCard, unsortCard } from '../../app/kanbanslice/KanbanSlice'

interface Button{
    button_name: string,
    border:string,
    text:string
}

const Button = ({button_name, border,text}: Button) => {
    const Icon = iconMap[button_name]
    const dispatch = useDispatch()
    const [sorted, setSorted] = useState(false)

    function sort(){
      if(text === 'Sort by' && sorted === false){
        console.log('clicked');
        dispatch(sortCard())
      }
      if(text === 'Sort by' && sorted === true){
        console.log('clicked');
        dispatch(unsortCard())
      }
      setSorted(prev=>!prev)
    }
  return (
    <>
      {text === 'Sort by' ? <button onClick={sort} className={`px-3 h-9 rounded-lg flex items-center gap-2 border-2 border-gray-300 border-${border} shadow-sm cursor-pointer truncate`}>
        <Icon />
        <p>{text}</p>
      </button> :
        <button  className={`px-3 h-9 rounded-lg flex items-center gap-2 border-2 border-gray-300 border-${border} shadow-sm cursor-pointer truncate`}>
          <Icon />
          <p>{text}</p>
      </button>

      }
    </>
  )
}

export default Button
