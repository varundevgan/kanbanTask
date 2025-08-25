import { useEffect, useState } from 'react'
import KanbanColumns from '../../components/Kanban/KanbanColumns'
import type {cardsProps} from '../../Types/KanbanTypes'
import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import { useSelector } from 'react-redux'
import type { RootState } from '../../app/store'


const Kanban = () => {

    const kanbanColums = useSelector((state: RootState)=>state.kanban.columns)
    const cards = useSelector((state: RootState)=>state.kanban.cards)

    const [tasks, setTasks] = useState<cardsProps[]>(cards)

    useEffect(() => {
        setTasks(cards);
    }, [cards]);

    function handleDragEnd(event: DragEndEvent){
        const {active, over} = event

        if(!over) return
        const cardId = active.id as number
        const newColumn = over.id as cardsProps['title']

        setTasks(()=>
            tasks.map(task=>task.id === cardId ? {...task, title: newColumn} : task)
        )

        console.log(tasks)
    }

  return (
    <div className='w-full flex-1 mt-5 flex gap-10 overflow-x-scroll'>
       <DndContext onDragEnd={handleDragEnd}>
            {
            kanbanColums.map((column)=>(
                <KanbanColumns key={column.id} column={column} cards={tasks} />
            ))
        }
       </DndContext>
    </div>
  )
}

export default Kanban
