import React, {useState, useEffect} from "react";
import { deleteProduct, getProduct, registrarProduct, update } from "../api/product";
import "../css/Product.css"
import Tablapro from "./Tablapro";



function Product(){

  const [datos, setDatos] = useState({
    identificator: '',
    namep: '',
    category: 'Tecnologia',
    amount: '',
    price: '',
    description: ''
})
  
  const [idProduct, setIdProduct] = useState(null);
  const [data, setData] = useState ([]);

  useEffect ( () => {

    getProducts()

},[])

function getProducts() {
  getProduct().then ( (response) => {
      setData(response.data)

  })
}

function delProduct(_id) {
  deleteProduct(_id).then( (response) => {
    getProducts()
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
    identificator: datos.identificator,
    namep : datos.namep,
    category: datos.category,
    amount: datos.amount,
    price: datos.price,
    description: datos.description
  }

  console.log(obj)

  if(idProduct !== null){
    update(idProduct,obj).then( (response) => {
        if(response.data){
            getProducts()
            setDatos({
              identificator: '',
              namep: '',
              category: 'Tecnologia',
              amount: '',
              price: '',
              description: ''
            })
            setIdProduct(null);
        }
    })
  } else {
    registrarProduct({...obj}).then( (response) => {
        if(response.data){
          getProducts()
            setDatos({
              identificator: '',
              namep: '',
              category: 'Tecnologia',
              amount: '',
              price: '',
              description: ''
            })
        }
    })
  }
}

function editProduct({_id, identificator, namep, category, amount, price, description}) {
  if(_id) {
      setDatos({
        identificator,
        namep,
        category,
        amount,
        price,
        description
      })
      setIdProduct(_id)
  }
}



  const titleButton = idProduct !== null ? 'Modificar' : 'Registrar';

  return(
    <div className="container-product">
      <div className="container-product-left">
        <div className="container-form-product">
          <h1 className="title-product">Formulario de Registro</h1>
            <form className="formulario" onSubmit={datosEnviados}>
              <div>
                <div className="title-input">Identificador</div>
                  <input className="identificator-product" name="identificator" type="number" value={datos.identificator} onChange={change} autoComplete="off"/>
              </div>
              <div>
                <div className="title-input">Nombre del Producto</div>
                <input className="name-product" name="namep" type="text" value={datos.namep} onChange={change} autoComplete="off"/>
              </div>
              <div>
                <div className="title-input">Categoria</div>
                <select className="category-product" name="category" value={datos.category} onChange={change}>
                  <option value="Tecnologia" selected>Tecnologia</option>
                  <option value="Cocina">Cocina</option>
                  <option value="Muebles">Muebles</option>
                </select>
              </div>
              <div>
                <div className="title-input">Cantidad</div>
                <input className="amount-product" name="amount" type="number" value={datos.amount} onChange={change} autoComplete="off"/>
              </div>
              <div>
                <div className="title-input">Precio</div>
                <input className="price-product" name="price" type="text" value={datos.price} onChange={change} autoComplete="off"/>
              </div>
              <div>
                <div className="title-input">Descripción</div>
                <textarea className="description-product" rows="5" cols="50" name="description" value={datos.description} onChange={change} autoComplete="off"/>
              </div>
                            
              <button type="submit" className="sumit-user">{titleButton}</button>
            </form>
        </div>
      </div>
      <div className="container-product-right">
        <Tablapro data={data} deleteProduct={(_id) => delProduct(_id)} editProduct={(item) => editProduct(item)} />
      </div>
    </div>
  )
}

export default Product;
