//IMPORTAR MODULOS
import axios from 'axios';

//URL BASADA EN LA API
const INMUEBLE_REST_API_URL = 'http://localhost:3000/inmueble/';

//CLASE CON METODOS PARA REALIZAR EL CRUD
class InmuebleService {

    //OBTENER TODOS LOS INMUEBLES
    getAllInmueble(){
        return axios.get(INMUEBLE_REST_API_URL);
    }

    //CREAR UN INMUEBLE
    create(inmueble){
        return axios.post(INMUEBLE_REST_API_URL, inmueble)
    }

    //OBTENER INMUEBLE POR ID
    getInmuebleById(inmuebleId)
    {
        return axios.get(INMUEBLE_REST_API_URL+inmuebleId);
    }

    //ACTUALIZAR INMUEBLE
    updateInmueble(inmuebleId,inmueble)
    {
        return axios.put(INMUEBLE_REST_API_URL+inmuebleId,inmueble);
    }

    //ELIMINAR INMUEBLE
    deleteInmueble(inmuebleId)
    {
        return axios.delete(INMUEBLE_REST_API_URL+inmuebleId);
    }            

}

//SE CREA UNA INSTANCIA
const inmuebleServiceInstance = new InmuebleService();

export default inmuebleServiceInstance;