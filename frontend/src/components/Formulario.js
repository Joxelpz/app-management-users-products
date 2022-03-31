import React, {useState, useEffect} from "react";
import "../css/Formulario.css"
import Tabla from "./Tabla";
import { deleteUser, getUser, registrarUsuario, update } from "../api/users";



function Formulario(){

    const [datos, setDatos] = useState({
        name: '',
        username: '',
        pass: '',
        select: 'Admin',
        email: '',
        phone: ''
    })

    const [idUser, setIdUser] = useState(null);
    const [data, setData] = useState ([]);
    
    useEffect ( () => {

        getUsers()

    },[])

    function getUsers() {
        getUser().then ( (response) => {
            setData(response.data)

        })
    }

    function delUser(_id) {
        deleteUser(_id).then( (response) => {
            getUsers()
          })
    }

    function change( event ) {

        setDatos({
            ...datos,
            [event.target.name] : event.target.value 
        })
    }


   function datosEnviados( event ) {
        event.preventDefault()

        const obj = {
            name: datos.name,
            username : datos.username,
            pass: datos.pass,
            select: datos.select,
            email: datos.email,
            phone: datos.phone
        }

        console.log(obj)
        
        if(idUser !== null){
            update(idUser,obj).then( (response) => {
                if(response.data){
                    getUsers()
                    setDatos({
                        name: '',
                        username: '',
                        pass: '',
                        select: 'Admin',
                        email: '',
                        phone: ''
                    })
                    setIdUser(null);
                }
            })
        } else {
            registrarUsuario({...obj}).then( (response) => {
                if(response.data){
                    getUsers()
                    setDatos({
                        name: '',
                        username: '',
                        pass: '',
                        select: 'Admin',
                        email: '',
                        phone: ''
                    })
                }
            })
        }
    }



    function editUser({_id, name, username, pass, select, email, phone}) {
        if(_id) {
            setDatos({
                name,
                username,
                pass,
                select,
                email,
                phone
            })
            setIdUser(_id)
        }
    } 
    
    const titleButton = idUser !== null ? 'Modificar' : 'Registrate';

    return(

        <> 
            <div className="container">
                <div className="left">
                    <div className="container_form">
                        <h1 className="title-user">Formulario de Registro</h1>
                        <form className="formulario" onSubmit={datosEnviados}>
                            <div>
                                <div className="title-input">Nombre Completo</div>
                                <input className="nape-user" name="name" value={datos.name} type="text" onChange={change} autoComplete="off"/>
                            </div>
                            <div>
                                <div className="title-input">Nombre de usuario</div>
                                <input className="alias-user" name="username" value={datos.username} type="text" onChange={change} autoComplete="off"/>
                            </div>
                            <div>
                                <div className="title-input">Contraseña</div>
                                <input className="pass-user" name="pass" value={datos.pass} type="password" onChange={change} autoComplete="off"/>
                            </div>
                            <div>
                                <div className="title-input">Seleccione el rango del usuario</div>
                                <select className="select-user" name="select" value={datos.select} onChange={change}>
                                    <option value="Admin" selected>Admin</option>
                                    <option value="Superior">Superior</option>
                                    <option value="Usuario">Usuario</option>
                                </select>
                            </div>
                            <div>
                                <div className="title-input">Correo Electronico</div>
                                <input className="mail-user" name="email" value={datos.email} type="email" onChange={change} autoComplete="off"/>
                            </div>
                            <div>
                                <div className="title-input">Numero de contacto</div>   
                                <input className="number-user" name="phone" value={datos.phone} type="number" onChange={change} autoComplete="off"/>
                            </div>
                            
                            <button type="submit" className="sumit-user">{titleButton}</button>
                        </form>
                    </div>
                </div>

                <div className="right">
                    <Tabla data={data} deleteUser={(_id) => delUser(_id)} editUser={(item) => editUser(item)} />
                </div>
            </div>
            
        </>
        
    )

}

export default Formulario;