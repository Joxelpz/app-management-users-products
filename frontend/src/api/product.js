import instance from "./instance";
import Swal from 'sweetalert2';

// Borramos un registro de producto
export async function deleteProduct(id) { 
    try {
       const response = await instance.delete(`/product/${id}`);
       Swal.fire({
        text: 'Registro borrado con Exito',
        icon: 'success',
        confirmButtonText: 'Cerrar'
      })
       return response
    } catch (error) {
        Swal.fire({
            text: 'No se ha podido borrar el Registro. Vuelva a intentarlo.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
          })
    }
}

// Obtenemos todos los registros de producto
export async function getProduct() {
    try {   
        const response = await instance.get('/product');
       return response
    } catch (error) {
      console.error(error);
    }
}

// Creamos un registro de producto
export async function registrarProduct(obj) {
    try {
        const response = await instance.post('/product' , obj );
        Swal.fire({
            text: 'Registro Exitoso',
            icon: 'success',
            confirmButtonText: 'Cerrar'
          })
        return response
    } catch (error) {
        Swal.fire({
            text: error.response.data.message,
            icon: 'error',
            confirmButtonText: 'Cerrar'
          })
    }
}

// Modificamos el registro de producto
export async function update(id,obj) { 
    try {
       const response = await instance.patch(`/product/${id}` , obj);
       Swal.fire({
        text: 'Registro Actualizado con Exito',
        icon: 'success',
        confirmButtonText: 'Cerrar'
      })
       return response
    } catch (error) {
        Swal.fire({
            text: 'No se ha podido hacer la Actualizacion. Vuelva a intentarlo.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
          })
    }
}
