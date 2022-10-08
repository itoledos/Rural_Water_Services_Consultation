import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import UserContext from "../contextos/user-context";
import { useNavigate } from 'react-router-dom';
// REACT BOOTSTRAP
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
// OTROS
import Swal from 'sweetalert2';
import { BiUpload } from 'react-icons/bi';

const InitialData = {
    userID: '',
    rolProp: '',
    name: '',
    address: '',
    mail: '',
    phone: 900000000,
    meterID: '',
    member: false,
    active: true
};

const InitialReading = {
    userID: '',
    rolProp: '',
    meterID: '',
    anio: 1950,
    mes: '',
    medicion: ''
}

const EditarLectura = (props) => {

    const context = useContext(UserContext)

    const navigate=useNavigate();
    const [form, setForm] = useState(
        InitialData
    );
    const [usuarios, setUsuarios] = useState([]);
    const [mostrar, setMostrar] = useState(false);
    const [mostrarDos, setMostrarDos] = useState(false);
    const [id, setId] = useState('');
    const [idLectura, setIdLectura] = useState('');
    const [lecturasTodas, setLecturasTodas] = useState(InitialReading);
    const [lectura, setLectura] = useState(InitialReading);


    useEffect(()=> {
        if(!context.usuario){
            if(sessionStorage.getItem('USUARIO')){
                context.setUsuario(JSON.parse(sessionStorage.getItem('USUARIO')));
            }
            else {
            navigate('/login');
            }
        } else {
            sessionStorage.setItem('USUARIO', JSON.stringify(context.usuario)); 
        };
        axios.get('/api/consumers/all')
        .then(res=>{
            setUsuarios(res.data.all);
        })
        axios.get('/api/readings/all')
        .then(res=>{
            setLecturasTodas(res.data.all);
        })
    }, [])


    const updateLectura = ({target: {name, value}}) => {
        setLectura({
            ...lectura,
            [name]: value})

        if(name=='anio'&&lectura.mes!=''){
            setMostrarDos(true)
        } else if(name=='mes'&&lectura.anio!=1950) {
            setMostrarDos(true)
        } else if(lectura.mes!=''&&lectura.anio!=1950) {
            setMostrarDos(true)
        } else {
            setMostrarDos(false)
        }
    }

    const updateLecturaDos = ({target: {name, value}}) => {
        setLectura({
            ...lectura,
            [name]: value
        });
    }

    const findUser = ({target: {value}}) => {
        if(value!='') {
            axios.get('/api/consumers/'+value)
            .then(res=>{
                setForm(res.data.justOne);
                setLectura({
                        userID: usuarios.find(itm=>itm._id==value).userID,
                        rolProp: usuarios.find(itm=>itm._id==value).rolProp,
                        meterID: usuarios.find(itm=>itm._id==value).meterID,
                        anio: 1950,
                        mes: '',
                        medicion: ''
                    });
            })
            .then(setMostrar(true))
            .then(setId(value))
        } else {
            setMostrar(false)
        }
    }

    const showReading = ({target: {name,value}}) => {

        axios.get('/api/readings/all')
        .then(res=> {
            setLecturasTodas(res.data.all)
        })
        .then(()=>
            setLectura({
                ...lectura,
                ['medicion']: lecturasTodas.find(itm=>itm.userID==lectura.userID&&itm.mes==lectura.mes&&itm.anio==lectura.anio).medicion
            })
        )
        .then(
            setIdLectura(lecturasTodas.find(itm=>itm.userID==lectura.userID&&itm.mes==lectura.mes&&itm.anio==lectura.anio)._id)
        )
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('/api/readings/'+idLectura,
        lectura)
        .then(res=>{
            console.log(res);
        })
        .then(ud=>{
            console.log(ud);
            Swal.fire(`Lectura editada exitosamente`);
        })
    }
                    
    const salir = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('USUARIO');
        navigate('/');
    }

    return(
        <React.Fragment>

            <Container className="d-flex flex-wrap justify-content-center">

                <Card className='w-75 mt-5' border='light' style={{boxShadow: '1px 1px 10px 2px #D1D1D1', minWidth: '360px'}}>

                    <Card.Header as='h2' style={{background: '#ffffff', color: '#666666'}}>Administrador de Información</Card.Header>

                    <Card.Body>

                        <Card.Title as='h4' style={{color: '#666666'}}>Ingresar nueva lectura</Card.Title>

                        <Form className="mt-2" onSubmit={handleSubmit} style={{fontSize: '1em'}}>

                            <Container 
                                as={Row}
                                className="d-flex flex-wrap flex-column align-items-center w-100 mb-2"
                                style={{
                                    // marginLeft: '40px',
                                    minWidth: '360px',
                                    borderRadius: '4px',
                                    background: 'none',
                                }}>

                                <Form.Label className="mb-2 mt-3 w-25">
                                    Elegir ID Usuario: 
                                </Form.Label>

                                <Form.Select className="mb-2 mt-2 w-75" 
                                    aria-label="Default select example"
                                    size='sm'
                                    onChange={findUser} >

                                        <option value=''>
                                            Listado de usuarios
                                        </option>

                                        {usuarios.map((itm,idx)=>{
                                            return(
                                                <option key={idx} medicion={itm.userID} value={itm._id}
                                                    style={{fontSize: '1em'}}
                                                >{itm.userID} - {itm.name}</option>
                                            )
                                        })}
                                </Form.Select>
                            </Container>

                            <Container as={Row} className="d-flex flex-wrap justify-content-end w-100 mb-2" >
                                <Row>
                                    <Col>
                                        <Form.Group className="d-flex flex-wrap flex-column align-items-center mb-3 w-75"
                                            style={{ minWidth: '250px' }} >

                                            <Form.Label className="mb-2 mt-2 w-25">
                                                Año: 
                                            </Form.Label>

                                            <Form.Control
                                                type="number"
                                                min={1950} 
                                                name ="anio"
                                                value = {lectura.anio}  
                                                size='sm'
                                                onChange={updateLectura} />
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group className="mb-3 w-75" style={{ minWidth: '250px' }} >

                                            <Form.Label className="mb-2 mt-2 w-25">
                                                Mes: 
                                            </Form.Label>

                                            <Form.Select name='mes' size='sm' onChange={updateLectura}>

                                                <option name='mes' value=''>Seleccione mes</option>
                                                <option name='mes' value='01'>Enero</option>
                                                <option name='mes' value='02'>Febrero</option>
                                                <option name='mes' value='03'>Marzo</option>
                                                <option name='mes' value='04'>Abril</option>
                                                <option name='mes' value='05'>Mayo</option>
                                                <option name='mes' value='06'>Junio</option>
                                                <option name='mes' value='07'>Julio</option>
                                                <option name='mes' value='08'>Agosto</option>
                                                <option name='mes' value='09'>Septiembre</option>
                                                <option name='mes' value='10'>Octubre</option>
                                                <option name='mes' value='11'>Noviembre</option>
                                                <option name='mes' value='12'>Diciembre</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Container>

                            
                            {mostrar && mostrarDos && 

                                        <Container>
                                            
                                            <Container as={Row} className="justify-content-center">

                                                <Form.Group className="d-flex flex-wrap flex-column align-items-center mb-3 w-75"
                                                    style={{ minWidth: '250px' }} >

                                                    <Form.Label className="mb-2 mt-2 w-25">
                                                        Lectura: 
                                                    </Form.Label>

                                                    <Form.Control 
                                                        style={{width: '20%', minWidth: '250px'}}
                                                        type="number" 
                                                        name="medicion" 
                                                        value={lectura.medicion}
                                                        placeholder="m3 acumulados" 
                                                        size='sm'
                                                        onChange={updateLecturaDos} />
                                                </Form.Group>

                                                <Button 
                                                    className="mb-3 w-25" 
                                                    name='medicion'
                                                    value={lectura.medicion} 
                                                    variant="light" 
                                                    onClick={showReading}
                                                    style={{minWidth: '200px', margin: '10px'}} >

                                                    <BiUpload/> Mostrar lectura actual
                                                </Button>

                                                <Button className="mb-3 w-25" variant="warning" type="submit"
                                                    style={{minWidth: '200px', margin: '10px'}}
                                                >

                                                    <BiUpload/> Ingresar lectura
                                                </Button>
                                            </Container>
                                        </Container>
                                }
                        </Form>
                    </Card.Body>

                    <Card.Footer>
                        <Row>
                            <Col>
                                <a href='/' >Volver a Página principal</a>
                            </Col>
                            <Col>
                                <a href='/admin' >Volver a Menú de operaciones</a>
                            </Col>
                            <Col>
                                <a href='#' onClick={salir} style={{color: '#444444'}} >Cerrar Sesión</a>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>
            </Container>
        </React.Fragment>
    )
}



export default EditarLectura;