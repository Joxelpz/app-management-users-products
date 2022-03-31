import React from "react";
import "../css/bar.css"
import imageUsers from "../assets/usuario.png"
import { useNavigate } from "react-router-dom";
import { removeUserSession, getUser } from "../services/auth";


function Bar(){


    const navigate = useNavigate();

    function logout(){
        removeUserSession()
        navigate('/login')
    }

    return(

        <div className="background-bar">
            <div className="container_bar">
                <div className="bar">
                    <div className="left_bar"></div>
                    <div className="center_bar">
                        <img className="img_center" src={imageUsers}/>
                        <div className="user_center">{ getUser().username }</div>
                    </div>
                    <div className="rightbar">
                        <button className="right_bar" onClick={logout}>Cerrar sesión</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Bar;
