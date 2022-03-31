import React, { useEffect, useState } from "react";
import "../css/Tabla.css"
import imageUsers from "../assets/lupa.png"
import { getUser } from "../services/auth";



function Tablapro(props){


    const {data, deleteProduct, editProduct} = props;
    const role =getUser().select;
    const isValidationRole = role === 'Superior';
    const [search, setSearch] = useState('');
    const [dataProducts, setDataProducts] = useState([]);

    useEffect( () => {
        setDataProducts(data);
    },[data])

    function change(e){
        setSearch(e.target.value);
    }

    function searchData(){
        const filterData = data.filter( (item) => item.identificator === parseInt(search));
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
                <h1 className="title_tab">Productos registrados</h1>
                <div className="search">
                    <input className="bar-search" type="number" placeholder="Buscar por identificador" onChange={change} value={search} autoComplete="off"/>
                    <button className="button-search" onClick={searchData}>
                        <img className="img-search" src={imageUsers} />
                    </button>
                </div>
            </div>
                <table>
                    <thead>
                        <tr>
                            <th className="th">Identificador</th>
                            <th className="th">Nombre</th>
                            <th className="th">Categoria</th>
                            <th className="th">Cantidad</th>
                            <th className="th">Precio</th>
                            <th className="th">Descripción</th>
                            <th className="th">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataProducts.map ((item,index) => {
                            return (
                                <tr key={index}>
                                    <td className="td">{item.identificator}</td>
                                    <td className="td">{item.namep}</td>
                                    <td className="td">{item.category}</td>
                                    <td className="td">{item.amount}</td>
                                    <td className="td">{item.price}</td>
                                    <td className="td">{item.description}</td>
                                    <td className="td">
                                        <div className="button_tab">
                                            <button className="edit" style={{ cursor: isValidationRole ? 'pointer' : 'initial', background: isValidationRole ? '#7066e0' : '#C4C4C4'}} disabled={ isValidationRole ? false : true} onClick={() => editProduct(item)}>Editar</button>
                                            <button className="delete" style={{ cursor: isValidationRole ? 'pointer' : 'initial', background: isValidationRole ? '#7066e0' : '#C4C4C4'}} disabled={ isValidationRole ? false : true} onClick={() => deleteProduct(item._id)}>Borrar</button>
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

export default Tablapro;