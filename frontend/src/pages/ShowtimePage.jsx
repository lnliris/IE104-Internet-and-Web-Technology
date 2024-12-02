import Showtime from "../components_ShowTime/Showtime";
import AuthContent from "../layouts/auth-content";
import Navbar from "../components/nav-bar"
import Footer from "../components/footer"

function ShowtimePage() {
  return (
    <>
    <Navbar></Navbar>
    
    <Showtime></Showtime>
    <Footer></Footer>
    </>
  )
}

export default ShowtimePage