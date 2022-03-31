import instance from "./instance";
import Swal from 'sweetalert2';

export async function login(obj) {
    try {
        const response = await instance.post('/auth/singin' , obj );
        return response
    } catch (error) {
        console.log(error);
        Swal.fire({
            text: error.response.data.message,
            icon: 'error',
            confirmButtonText: 'Cerrar'
          }) 
    }
}


