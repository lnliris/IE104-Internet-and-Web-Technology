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
    <PopSuc/>
    
    <Routes>
      <Route path="/" element={<Index />}/>
      <Route path="/search" element={<SearchPage />} />
      <Route path="/showtime" element={<ShowtimePage/>} />
      <Route path='/selectseats' element={<SelectSeatsPage/>} />
      <Route path='/cornpage' element={<CornPage/>} />
      <Route path='/payment' element={<PaymentPage/>} />
    </Routes>
    </>
  )
}

export default App
