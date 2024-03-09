import React, { useEffect, useState } from "react";
import InmuebleService from "../services/InmuebleService";
import { Link } from "react-router-dom";

export const ListInmuebleComponent = () => {

    const [inmueble, setInmueble] = useState([]);

    useEffect(() => {
        listarTodos();
    }, [])

    const listarTodos = () => {
        InmuebleService.getAllInmueble().then(response => {
            setInmueble(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const deleteInmueble = (inmuebleId) => {
        InmuebleService.deleteInmueble(inmuebleId).then((response) => {
            listarTodos();
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="container">
            <h2 className="text-center">Inmueble Registrados</h2>

            <Link to='add-inmueble' className="btn btn-primary mb-2">Nuevo</Link>
            <table className="table table-bordered table-striped">
                <thead>
                    <th>ID</th>
                    <th>Direccion</th>
                    <th>Habitaciones</th>
                    <th>Tipo</th>
                    <th>Costo</th>
                </thead>
                <tbody>
                    {
                        inmueble.map(
                            inmueble =>
                                <tr key={inmueble.id}>
                                    <td>{inmueble.id}</td>
                                    <td>{inmueble.direccion}</td>
                                    <td>{inmueble.num_habitaciones}</td>
                                    <td>{inmueble.tipo}</td>
                                    <td>{inmueble.costo}</td>
                                    <td>
                                        <Link className="btn btn-info mr-2" to={`/edit-inmueble/${inmueble.id}`}>Actualizar</Link>
                                        
                                        <button className="btn btn-danger" onClick={()=>deleteInmueble(inmueble.id)}>Eliminar</button>
                                    </td>
                                </tr>
                        )}
                </tbody>
            </table>
        </div>
    )
}

export default ListInmuebleComponent;