import logoicon from "../assets/img/icon-logo.png"
import facecol from '../assets/img/face-color.png';
import xcol from '../assets/img/x-color.png';
import ggcol from '../assets/img/google-color.png';
import { useEffect } from "react";
import $ from "jquery"

function Login(prop){

    useEffect(()=>{
        do_bind_event()
    },[])

    var do_bind_event   = ()=>{
        $("#loginbtn").on("click", ()=>{
            do_login();
        })
    }

    var do_login        = ()=>{
            const mail = $("#mailinp").val();
            const pass = $("#passinp").val();
            if(!mail && !pass){
                alert("Hãy nhập đầy đủ thông tin đăng nhập!")
            }else{
                if(mail.length  === 0 ||  !mail.includes('@') || !mail.includes('.')){
                    alert("Hãy kiểm tra lại email")
                }else{
                    if(pass.length  === 0 || pass.length < 8 ){
                        alert("Hãy nhập mật khẩu")
                    }else{
                        $('#authpopup').addClass("hide");
                        $("#login").addClass("hide");
                        $("#img_account_top").removeClass("hide");
                    }
                }
            }
       
    }

    return(
            <div id="login-popup" className="auth_box">
                <img width="150px" src={logoicon}/>
                <h3 className="header-auth mb-30">Đăng nhập tài khoản</h3>
                <div className="w-100 flex f-col mb-30">
                    <label className=" lable_auth">Email</label>
                    <input className="inp_cus inp_auth" id="mailinp" placeholder="Nhập email"/>
                </div>
                <div className="w-100 flex f-col">
                    <label className=" lable_auth" >Mật khẩu</label>
                    <input className="inp_cus inp_auth" id="passinp" placeholder="Nhập mật khẩu"/>
                </div>
                <div className="w-100 flex f-col">
                    <button className="w-100 btn_cus auth_btn" id="loginbtn"><p className="">Đăng nhập</p></button>
                </div>
                <div className=" flex f-col text-center mt-10">
                    <span className="nav-auth">Quên mật khẩu?</span>
                </div>
                
                <div className="w-100 flex cenhor cenver text-center mt-10 gap10">
                    <div className="line"></div><span><b>hoặc</b></span><div className="line"></div>
                </div>
                <div className=" flex f-col text-center mt-10">
                    <span>Đăng nhập bằng</span>
                    <div className="flex gap20 mt-10">
                        <img src={facecol}/>
                        <img src={xcol}/>
                        <img src={ggcol}/>
                    </div>
                </div>
                <div className="line flex f-col text-center mt-10 w-100">
                </div> 
                <div className="w-100 flex cenhor cenver text-center mt-30">
                    <p>Bạn chưa có tài khoản? <a onClick={prop.changetoRegis} className="nav-auth" style={{"color":"#3D70B7"}}>Đăng ký ngay</a></p>
                </div>
            </div>
    )
}

export default Login;