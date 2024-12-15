import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import "./stylesheets/index.css";
import Index from "./pages";
import Loading from "./components/loading";
import PopErr from "./components/PopErr";
import PopSuc from "./components/PopSuc";
import OrderFilm from "./pages/order_film";
import Profile from "./pages/profile";
import FilmList from "./pages/fiml_list";
function App() {

  return (
    <>
    <Loading/>
    <PopErr/>
    <PopSuc/>
      <Routes>
        <Route path="/*" element={<Index />}/>
        <Route path="/order" element={<OrderFilm />}/>
        <Route path="/profile/*" element={<Profile />}/>
        <Route path="/filmlist/*" element={<FilmList />}/>
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
    
    </>
  )
}

export default App
