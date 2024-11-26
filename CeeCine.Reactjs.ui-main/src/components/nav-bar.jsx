/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import $ from "jquery";
import logo from "../assets/img/logo.png";

function navbar(){

    const navigate = useNavigate();

    useEffect(()=>{
    },[location]) 



    return(
        <>
        {/* nav side */}

        <header>

            <div className="wrap_header_nav">
            <div className="wrap_right_nav" >
                <div className="logo" id="logo-nav" onClick={()=>{navigate("/home");window.location.reload() }}>
                   <img id="logo-trans" src={logo} width={250}/>
                </div>
            </div>

            <div className="wrap_center_ul">
                <ul className="center_ul" id="nav-center">
                    <li className="nav_link nav_header" id="home" onClick={()=>{navigate("/home")}}>Trang chủ</li>
                    <li className="nav_link nav_header" id="about" onClick={()=>{navigate("/about")}}>Phim</li>
                    <li className="nav_link nav_header" id="portfolio" onClick={()=>{navigate("/portfolio")}}>Rạp chiếu</li>
                    <li className="nav_link nav_header" id="events" onClick={()=>{navigate("/events")}}>Khuyến mãi</li>
                </ul>
            </div>

            <div className="wrap_auth_btn" id="auth_btn">
                <button className="btn" id="search" ><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M26.75 26.75L19.388 19.388M19.388 19.388C21.3108 17.4653 22.5 14.809 22.5 11.875C22.5 6.00697 17.743 1.25 11.875 1.25C6.00697 1.25 1.25 6.00697 1.25 11.875C1.25 17.743 6.00697 22.5 11.875 22.5C14.809 22.5 17.4653 21.3108 19.388 19.388Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg></button>
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