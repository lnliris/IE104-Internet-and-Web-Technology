import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./stylesheets/index.css";
import Index from "./pages";
import Loading from "./components/loading";
import PopErr from "./components/PopErr";
import PopSuc from "./components/PopSuc";
function App() {

  return (
    <>
    <Loading/>
    <PopErr/>
    <PopSuc/>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Index />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
