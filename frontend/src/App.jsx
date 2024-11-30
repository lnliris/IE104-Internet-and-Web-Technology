import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./stylesheets/index.css";
import Index from "./pages";
import Loading from "./components/loading";
import PopErr from "./components/PopErr";
import PopSuc from "./components/PopSuc";
import showtime from "./pages/showtime";
function App() {

  return (
    <>
    <Loading/>
    <PopErr/>
    <PopSuc/>
      <Routes>
        <Route path="/*" element={<Index />}/>
        <Route path="/showtime" element={<showtime />} />
      </Routes>
    
    </>
  )
}

export default App
