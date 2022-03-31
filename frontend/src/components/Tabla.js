import React, { useEffect, useState } from "react";
import "../css/Tabla.css"
import imageUsers from "../assets/lupa.png"



function Tabla(props){


    const {data, deleteUser, editUser} = props;
    const [search, setSearch] = useState('');
    const [dataProducts, setDataProducts] = useState([]);

    useEffect( () => {
        setDataProducts(data);
    },[data])

    function change(e){
        setSearch(e.target.value);
    }

    function searchData(){
        const filterData = data.filter( (item) => item.username === search);
        if(search === ''){
            setDataProducts(data);
        }else{
            setDataProducts(filterData);
        }
    }
    
    
    return(

        <div className="center-table">
            <div className="container-table">
            <div className="bar_tab">
                <h1 className="title_tab">Usuarios registrados</h1>
                <div className="search">
                    <input className="bar-search" placeholder="Buscar por usuario" onChange={change} value={search} autoComplete="off"/>
                    <button className="button-search" onClick={searchData}>
                        <img className="img-search" src={imageUsers} />
                    </button>
                </div>
            </div>
                <table>
                    <thead>
                        <tr>
                            <th className="th">Nombre</th>
                            <th className="th">Usuario</th>
                            <th className="th">Rango</th>
                            <th className="th">Email</th>
                            <th className="th">Telefono</th>
                            <th className="th">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataProducts.map ((item,index) => {
                            return (
                                <tr key={index}>
                                    <td className="td">{item.name}</td>
                                    <td className="td">{item.username}</td>
                                    <td className="td">{item.select}</td>
                                    <td className="td">{item.email}</td>
                                    <td className="td">{item.phone}</td>
                                    <td className="td">
                                        <div className="button_tab">
                                            <button className="edit" onClick={() => editUser(item)}>Editar</button>
                                            <button className="delete" onClick={() => deleteUser(item._id)}>Borrar</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {data.length === 0 && <div>No se encontraron resultados</div>}
            </div>
        </div>
        
    )

}

export default Tabla;