//IMPORTACION DE MODULOS Y SERVICIOS
import React, { useEffect, useState } from 'react'
import InmuebleService from '../services/InmuebleService';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const AddInmuebleComponent = () => {

    //DEFINICION DE ESTADO
    const [direccion, setDireccion] = useState('');
    const [num_habitaciones, setNum_habitaciones] = useState('');
    const [tipo, setTipo] = useState('');
    const [costo, setCosto] = useState('');

    const navigate = useNavigate();

    //GESTION DE PARAMETROS DE RUTA
    const { id } = useParams();

    //GESTION DE EVENTOS Y OPERACIONES CRUD
    const createInmueble = (e) => {
        e.preventDefault();
        const inmueble = { direccion, num_habitaciones, tipo, costo };
        if (id) {
            InmuebleService.updateInmueble(id, inmueble).then((response) => {
                console.log(response.data);
                navigate('/inmueble');
            }).catch(error => {
                console.log(error);
            })
        } else {
            InmuebleService.create(inmueble).then((response) => {
                console.log(response.data);
                navigate('/inmueble');
            }).catch(error => {
                console.log(error);
            })
        }
    }

    //EFECTO SECUNDARIO PARA CARGAR DATOS DE INMUEBLE
    useEffect(() => {
        InmuebleService.getInmuebleById(id).then((response) => {
            setDireccion(response.data.direccion);
            setNum_habitaciones(response.data.num_habitaciones);
            setTipo(response.data.tipo);
            setCosto(response.data.costo);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    const title = () => {
        if (id) {
            return <h2 className='text-center'>Actualizar Datos</h2>
        } else {
            return <h2 className='text-center'>Nuevo inmueble</h2>
        }
    }

    //RENDERIZADO DEL FORMULARIO
    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>

                        <h2 className='text-center'>
                            {
                                title()
                            }
                        </h2>

                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Direccion:</label>
                                    <input
                                        type='text'
                                        placeholder='Ingrese direccion'
                                        name='direccion'
                                        className='form-control'
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
                                    />
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Número de Habitaciones:</label>
                                    <input
                                        type='int'
                                        placeholder='Ingrese las habitaciones'
                                        name='habitaciones'
                                        className='form-control'
                                        value={num_habitaciones}
                                        onChange={(e) => setNum_habitaciones(e.target.value)}
                                    />
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Tipo:</label>
                                    <input
                                        type='text'
                                        placeholder='Tipo del inmueble'
                                        name='tipo'
                                        className='form-control'
                                        value={tipo}
                                        onChange={(e) => setTipo(e.target.value)}
                                    />
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Costo:</label>
                                    <input
                                        type='float'
                                        name='costo'
                                        className='form-control'
                                        value={costo}
                                        onChange={(e) => setCosto(e.target.value)}
                                    />
                                </div>

                                <button className='btn btn-success'
                                    onClick={(e) => createInmueble(e)}>Guardar</button>
                                &nbsp; &nbsp;
                                <Link to='/' className='btn btn-danger'>Cancelar</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddInmuebleComponent;