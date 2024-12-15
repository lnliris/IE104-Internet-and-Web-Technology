import {Route, Routes} from "react-router-dom";
import "./stylesheets/index.css";
import Index from "./pages/index";
import SearchPage from "./pages/searchPage";
import Loading from "./components/loading";
import PopErr from "./components/PopErr";
import PopSuc from "./components/PopSuc";
import ShowtimePage from "./pages/ShowtimePage";
import SelectSeatsPage from "./pages/SelectSeatsPage";
import CornPage from "./pages/CornPage";
import PaymentPage from "./pages/PaymentPage";
function App() {

  return (
    <>
    {/* <Loading/>
    <PopErr/>
    <PopSuc/> */}
    {/* <Routes>
      <Route path="/" element={<Index />}/>
      <Route path='/showtime' element={<Showtime />} />
    </Routes> */}
    
    <PopSuc/>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Index />}/>
      </Routes>
    
    </>
  )
}

export default App
