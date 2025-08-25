import React, { useEffect, useRef, useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import type {kanbanColumsProps, cardsProps} from '../../Types/KanbanTypes'
import KanbanCard from './KanbanCard';
import { useDroppable } from '@dnd-kit/core';
import { useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';
import TaskForm from '../Features/AddCardPopup';
import { addCard } from "../../app/kanbanslice/KanbanSlice";
import EditCardPopup from '../Features/EditCardPopup';

type ColumnProps = {
    column: kanbanColumsProps,
    cards: cardsProps[]
    setTasks:any
}



const KanbanColumns = ({column,cards,setTasks}:ColumnProps) => {
    
    cards = cards.filter(card=>card.title === column.title)
    const dispatch = useDispatch()
    const [showAddCard, setShowAddCard] = useState(false)
    const [showEditCard, setShowEditCard] = useState(false)
    const popupRef = useRef<HTMLDivElement | null>(null)
    const editPopupRef = useRef<HTMLDivElement | null>(null)

    const {setNodeRef} =  useDroppable({
        id: column.title
    })

    useEffect(()=>{

        function popUp(e:MouseEvent){
            if(popupRef.current && !popupRef.current.contains(e.target as Node)) {
                setShowAddCard(false)
            }
            if(editPopupRef.current && !editPopupRef.current.contains(e.target as Node)) {
                setShowEditCard(false)
            }
        }

        window.addEventListener('mousedown', popUp)
        return ()=> window.removeEventListener('mousedown',popUp)
    },[])

        const addNewCard = (tasks: {
        date: string;
        description: string;
        status: string;
        source: string;
        rating: number;
        verified: boolean;
        title: string;
    }) => {
        dispatch(addCard(tasks));
        setShowAddCard(false)
    };

    function checkCards(){
        console.log(cards);
        setShowEditCard(true)
    }

  return (
    <>
            {
                (showAddCard || showEditCard) && (
                    <div className='absolute backdrop-blur-sm inset-0 z-[10]'></div>
                )
            }
        <div ref={setNodeRef} className='relative h-full w-78 flex-shrink-0'>
            {showAddCard && createPortal(
                        <div ref={popupRef} className='absolute top-[30%] transform translate-x-[-50%] translate-y-[-50%] w-100 h-70 left-[50%] bg-blue-400 z-[11]'>
                        <TaskForm onSubmit={addNewCard} />
                    </div>
                    ,document.body
                )
            }
            {showEditCard && createPortal(
                        <div ref={editPopupRef} className='absolute top-[40%] transform translate-x-[-50%] translate-y-[-50%] w-100 h-70 left-[50%] bg-blue-400 z-[11]'>
                            <EditCardPopup />
                    </div>
                    ,document.body
                )
            }
            {/* heading */}
            <div className='w-full flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <span className='block w-2 h-2 bg-black rounded-full'></span>
                    <h2 className='text-lg font-[500]'>{column.title}</h2>
                    <span className='text-gray-400 font-[500]'>{cards.length}</span>
                </div>
                <div className='flex items-center gap-3'>
                    <BsThreeDots onClick={checkCards} className='w-5 h-5 text-gray-500' />
                    <FiPlus onClick={()=>setShowAddCard(prev=>!prev)} className='w-5 h-5 text-gray-500 font-[500] cursor-pointer hover:bg-gray-200 rounded-full' />
                </div>
            </div>
                {
                cards.map((card)=>(
                    <KanbanCard key={card.id} card={card} />
                ))
            }
            <div>

            </div>
        </div>
    </>
  )
}

export default KanbanColumns
