import ScheduleList from "../components_ShowTime/ScheduleList"
import Navbar from '../components/nav-bar'

function Showtime() {
  return (
    <>
    <div className='grid-flow-col '>
    <Navbar></Navbar>
    
    <ScheduleList></ScheduleList>
    </div>
    </>
  )
}

export default Showtime