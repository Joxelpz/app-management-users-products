import React, { useState } from "react";
import { login } from "../api/auth";
import { setUserSession } from '../services/auth';
import "../css/Loggin.css"
import { useNavigate } from 'react-router-dom';


function Login(){

    const navigate = useNavigate();
    const [loading, setLoading] = useState(null);
    const [datos, setDatos] = useState({
        username: '',
        pass: '',
    })


        const handleLogin = (e) => {
            e.preventDefault();
            setLoading(true);
            const obj = {
                username : datos.username,
                pass: datos.pass
            }
            login(obj)
            .then((res) => {
                setLoading(false);
                setUserSession(res.data.token, res.data.data);

                const role = res.data.data.select;
                if( role === 'Admin'){
                navigate('/users');
                }else{
                    navigate('/products');
                }
            })
        };

        function change( e ) {

            setDatos({
                ...datos,
                [e.target.name] : e.target.value 
            })
        }


    return(
        <div className="backgraund-login">
            <div className="container-login">
                <div className="container-">
                    <h1 className="title-login">Iniciar sesión</h1>
                    <form className="form-loggin" onSubmit={handleLogin}>
                        <div>
                            <div className="title-input">Nombre de usuario</div>
                            <input 
                            className="username"  
                            name="username"
                            value={datos.username}  
                            type="text" 
                            onChange={change}
                            autoComplete="off"
                            />
                        </div>
                        <div>
                            <div className="title-input">Contraseña</div>
                            <input 
                            className="pass" 
                            name="pass"
                            value={datos.pass}
                            type="password"
                            onChange={change}
                            autoComplete="off"
                            />
                            
                        </div>
                        <button type="submit" className="sumit-login">
                            {loading ? "Iniciando..." : "Iniciar sesión"}    
                        </button>
                    </form>
                </div>
            </div>             
        </div>
    )
}


export default Login;
