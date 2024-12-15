/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import $ from "jquery";
import logo from "../assets/img/logo.png";
import SearchBar from "./SearchBar";

function navbar(){

    const navigate = useNavigate();

    useEffect(()=>{
    },[location]) 

    const handleSearch = (searchTerm) => {
        // Chuyển hướng đến trang tìm kiếm với từ khóa tìm kiếm trong URL
        if (searchTerm) {
          navigate(`/search?title=${searchTerm}`);
        }
      }; 

    return(
        <>
        {/* nav side */}

        <header>

            <div className="wrap_header_nav">
            <div className="wrap_right_nav" >
                <div className="logo" id="logo-nav" onClick={()=>{navigate("/");window.location.reload() }}>
                   <img id="logo-trans" src={logo} width={250}/>
                </div>
            </div>

            <div className="wrap_center_ul">
                <ul className="center_ul" id="nav-center">
                    <li className="nav_link nav_header" id="home" onClick={()=>{navigate("/")}}>Trang chủ</li>
                    <li className="nav_link nav_header" id="about" onClick={()=>{navigate("/about")}}>Phim</li>
                    <li className="nav_link nav_header" id="portfolio" onClick={()=>{navigate("/portfolio")}}>Rạp chiếu</li>
                    <li className="nav_link nav_header" id="events" onClick={()=>{navigate("/events")}}>Khuyến mãi</li>
                </ul>
            </div>

            <div className="wrap_auth_btn" id="auth_btn">
                <SearchBar onSearch={handleSearch} />
                <button onClick={()=>{
                    $("#authpopup").removeClass("hide");
                }} className="btn nav_header" id="login"><p>Đăng nhập</p></button>
                 <img id="img_account_top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4CK8JotmDXKFp9CRdwf5J06VFbgY_BENmnw&s" className="userimg-prod hide" style={{"width" : "35px", "height" : "35px", "marginRight": "5px"}} />
            </div>
            </div>
            
        </header>
    </>
    );

}

export default navbar;