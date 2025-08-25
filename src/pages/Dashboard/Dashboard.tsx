import Navbar from '../../components/Navbar'
import Kanban from '../KanbanLayout/Kanban'

const Dashboard = () => {
  return (
    <div className='p-6 w-full overflow-x-hidden h-screen flex flex-col'>
      <Navbar />
      <Kanban />
    </div>
  )
}

export default Dashboard
