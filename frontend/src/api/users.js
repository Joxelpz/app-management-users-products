import instance from "./instance";
import Swal from 'sweetalert2';

// Borramos un registro de usuario
export async function deleteUser(id) { 
    try {
       const response = await instance.delete(`/users/${id}`);
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

// Obtenemos todos los registros de usuario
export async function getUser() {
    try {   
        const response = await instance.get('/users');
       return response
    } catch (error) {
      console.error(error);
    }
}

// Creamos un registro de usuraio
export async function registrarUsuario(obj) {
    try {
        const response = await instance.post('/users' , obj );
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

// Modificamos el registro de usuario
export async function update(id,obj) { 
    try {
       const response = await instance.patch(`/users/${id}` , obj);
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
