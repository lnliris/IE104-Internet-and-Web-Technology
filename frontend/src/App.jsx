import {Route, Routes} from "react-router-dom";
import "./stylesheets/index.css";
import Index from "./pages";
import Loading from "./components/loading";
import PopErr from "./components/PopErr";
import PopSuc from "./components/PopSuc";
import Showtime from "./pages/Showtime";
function App() {

  return (
    <>
    {/* <Loading/>
    <PopErr/>
    <PopSuc/> */}
    <Showtime></Showtime>
    
    {/* <Routes>
      <Route path="/" element={<Index />}/>
      <Route path='/showtime' element={<Showtime />} />
    </Routes> */}
    
    </>
  )
}

export default App
