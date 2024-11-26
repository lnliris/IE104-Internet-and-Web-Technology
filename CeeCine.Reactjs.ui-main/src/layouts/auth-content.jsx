import { useEffect } from "react";
import Login from "../components/login";
import Register from "../components/register";
import $ from "jquery"

function AuthContent(){

    useEffect(()=>{
        do_bind_event()
    })

    var do_bind_event   = ()=>{
        document.addEventListener("keydown", function(event) {
            if (event.key === "Escape" || event.code === "Escape") { // Kiểm tra phím 'Esc'
                $('#authpopup').addClass("hide");
            }
        });
    }

    return(
        <section id="authpopup" className="wrap-auth-popup flex starthor cenver hide">

        <Login changetoRegis={
            ()=>{
                $("#regis-popup").removeClass("hide");
                $("#login-popup").addClass("hide")
            }
        }/>
        <Register changetoLogin={()=>{
            $("#login-popup").removeClass("hide");
            $("#regis-popup").addClass("hide")
        }}/>

        </section>
    )
    
}

export default AuthContent;