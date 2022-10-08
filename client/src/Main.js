import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import UserContext from "./components/contextos/user-context";
import NavBarAPR from "./components/NavBarAPR";
// import fondo from './img/water-tower.jpeg';
import fondo3 from './img/water-tower-3.jpg';
// REACT SCROLL
import {Link} from 'react-scroll';
// REACT BOOTSTRAP
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/esm/Container";
// REACT ICONS
import { RiNumbersLine } from 'react-icons/ri';
import { IconContext } from "react-icons/lib";
// OTROS
import Swal from "sweetalert2";


const initialConsulta = {
    anio: 1950,
    mes: '12',
    rolProp: ''
}

const InitialReading = {
    userID: '',
    rolProp: '',
    meterID: '',
    anio: 1950,
    mes: '',
    medicion: '',
}

const Main = (props) => {

    const [usuarios, setUsuarios] = useState([]);
    const [mostrarSalida, setMostrarSalida] = useState(false);

    useEffect(()=> {
        if(!context.usuario){
            if(sessionStorage.getItem('USUARIO')){
                context.setUsuario(JSON.parse(sessionStorage.getItem('USUARIO')));
                setMostrarSalida(true);
            }
            else {
                // navigate('/login');
                setMostrarSalida(false)
            }
        } else {
            sessionStorage.setItem('USUARIO', JSON.stringify(context.usuario)); 
            setMostrarSalida(true);
        };
        axios.get('/api/consumers/all')
        .then(res=>{
            setUsuarios(res.data.all);
        })
    }, [])
    
    // const compareDate = (a,b) => {
    //         if (a.type<b.type) {
    //                 return -1
    //             } if (a>b){
    //                     return 1
    //                 }
    //                 return 0
    //             }
    //             const [pets] = [props.allPets.sort((a,b)=> compareDate(a,b)),props.setAllPets];
    const [consulta, setConsulta] = useState(
        initialConsulta
        );
    const context = useContext(UserContext)
    const [lecturas, setLecturas] = useState(initialConsulta);
    const [lecturaBuscadaID, setLecturaBuscadaID] = useState('');
    const [lecturaAnterior, setLecturaAnterior] = useState(initialConsulta);
    const [lecturaAnteriorID, setLecturaAnteriorID] = useState('');
    const navigate = useNavigate();
                    
    useEffect(()=> {

        axios.get('/api/readings/all')
        .then(res=>{
            setLecturas(res.data.all);
        })
    }, [])

    // useEffect(() => {
    //     axios.get("/api/pets/all")
    //         .then(res=>{
    //             props.setAllPets(res.data.all);
    //             // console.log(props.allPets);
    //         })
    //         .catch(err=>console.log("Error: "+{err}))
    //     },[])

    const salir = (e) => {
        // e.preventDefault();
        window.location.reload(false);
        sessionStorage.removeItem('USUARIO');
        navigate('/');
    }

    // const mostrar = (a,b) => {
    //     console.log(a);
    //     console.log(b);
    // }
        
    const handleChange = ({target: {name, value}}) => {
        // console.log(name);
        // console.log(value);

        setConsulta(
            {
                ...consulta,
                [name]: value
            }
        );

        if(name=='anio'&&value=='01'){
            setLecturaAnterior(
                {
                    ...consulta,
                    [name]: (value-1)
                }
        );
        } else if(name=='anio') {
            setLecturaAnterior(
                {
                    ...consulta,
                    [name]: value
                }
            );
        }

        if(name=='rolProp'){
            setLecturaAnterior(
                {
                    ...lecturaAnterior,
                    [name]: value
                }
            );
        }

        if(name=='mes'&&value=='01'){
            setLecturaAnterior(
                {
                    ...consulta,
                    mes: '12',
                    anio: (consulta.anio-1)
                }
            );
        } else if(name=='mes'&&(parseInt(value)-1)<10){
            setLecturaAnterior(
                {
                    ...consulta,
                    mes: '0'+(parseInt(value)-1)
                }
            );
        } else if(name=='mes'){
            setLecturaAnterior(
                {
                    ...consulta,
                    mes: toString((parseInt(value)-1))
                }
            );
        }
    }
    
    const navegar = (idUno,idDos) => {
        navigate('/readings/'+idUno+'/'+idDos);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        try{
            navigate('/readings/'+lecturas.find((itm=>(itm.rolProp==consulta.rolProp&&itm.mes==consulta.mes&&itm.anio==consulta.anio)))._id+'/'+lecturas.find((itm=>(itm.rolProp==lecturaAnterior.rolProp&&itm.mes==lecturaAnterior.mes&&itm.anio==lecturaAnterior.anio)))._id);
        } catch(err) {
            // console.log(err);
            Swal.fire('Registro no existe   ')
        }
    }

    return(
        <React.Fragment>
            <Container 
                className='d-flex flex-column justify-content-start align-items-center'
                style={{
                    position: 'relative',
                    height: '200vh', 
                    width: '100%',
                    margin: '0',
                    overflow: 'auto'
                }}
            >
                {/* NAVBAR */}
                <NavBarAPR />

                {/* BODY */}
                <img src={fondo3} alt='copa de agua bg' 
                    style={{
                        position: 'fixed',
                        width: '115%',
                        minWidth: '1050px',
                        padding: '0',
                        margin: '0',
                        top: '-10%',
                        opacity: '0.8'
                    }}
                />
                   <Link to='consulta' spy={true} smooth={true} offset={-120} duration={500}
                        style={{
                            top: '16%',
                            margin: '0',
                            padding: '0',
                            position: 'absolute',
                            display: 'flex',
                            flexAlign: 'center',

                        }}
                    >
                        <Button variant='dark'
                            style={{
                                fontSize: '1.8em',
                                width: 'auto',
                                margin: '0',
                                padding: '10px',
                                zIndex: '10',
                            }}
                        >
                            Consulte su boleta
                        </Button>
                    </Link>
                    
                    
                    <Form
                        onSubmit={handleSubmit}
                        style={{
                            position: 'relative',
                            top: '120vh',
                            margin: '0'
                        }}
                        id='consulta'
                    >
                        <Card 
                            className='mt-5'
                            border="primary"
                            bg='light'
                            style={{ width: '100%' }}>
                            <Card.Header variant='top' style={{fontSize: '1.4rem'}}>
                                Ingrese datos solicitados:
                            </Card.Header>
                            <Card.Body>
                                    <Form.Group 
                                        className='d-flex flex-wrap justify-content-start mt-2 mb-2'
                                        style={{marginLeft: '1rem'}}
                                    >
                                        <Row
                                            style={{
                                                width: '100%',
                                                fontSize: '1.1rem'
                                            }}
                                        >
                                            <Col xs={5}>
                                                <Form.Label 
                                                    className='d-flex flex-wrap justify-content-start'
                                                    style={{
                                                        textAlign: 'start'
                                                    }}
                                                >
                                                    Año: 
                                                </Form.Label>
                                            </Col>
                                            <Col xs={7}>
                                                <Form.Control
                                                    type="number"
                                                    min={1950} 
                                                    name ="anio"
                                                    value = {consulta.anio}  
                                                    onChange={handleChange} 
                                                    style={{
                                                        fontSize: '1rem'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <Form.Group
                                        className='d-flex flex-wrap justify-content-start mt-2 mb-2'
                                        style={{marginLeft: '1rem'}}
                                    >
                                        <Row
                                            style={{
                                                width: '100%',
                                                fontSize: '1.1rem'
                                            }}
                                        >
                                            <Col xs={5}>
                                                <Form.Label className='d-flex justify-content-start'
                                                    style={{
                                                        textAlign: 'start'
                                                }}
                                                >
                                                    Mes: 
                                                </Form.Label>
                                            </Col>
                                            <Col xs={7}>
                                                <Form.Select 
                                                    name='mes' 
                                                    onChange={handleChange}
                                                >
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
                                            </Col>
                                        </Row>

                                    </Form.Group>
                                    <Form.Group
                                        className='d-flex flex-wrap justify-content-start mt-2 mb-2'
                                        style={{marginLeft: '1rem'}}
                                    >
                                        <Row
                                            style={{
                                                width: '100%',
                                                fontSize: '1.1rem'
                                            }}
                                        >
                                            <Col xs={5}>
                                                <Form.Label className='d-flex flex-row justify-content-start'
                                                    style={{
                                                        textAlign: 'start'
                                                    }}
                                                >
                                                    Rol propiedad:
                                                </Form.Label>
                                            </Col>
                                            <Col xs={7}>
                                                <Form.Control
                                                    type="text" 
                                                    name ="rolProp"
                                                    placeholder="Ingrese rol de propiedad" 
                                                    value = {consulta.rolProp} 
                                                    onChange={handleChange} 
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                            </Card.Body>
                            <Card.Text className="w-100 d-flex flex-wrap align-content-center justify-content-start col">
                                <Button 
                                    className="w-100"
                                    size='lg'
                                    type="submit"
                                    style={{
                                        borderRadius: '2px',
                                        height: '70px',
                                        fontWeight: 'bold'
                                    }}
                                    >
                                    <Row>
                                        <Col xs='3'>
                                            <IconContext.Provider  value={{ size: "70%", color: "#1BAFFF", className: "global-class-name" }}>
                                                <RiNumbersLine/>
                                            </IconContext.Provider>
                                        </Col>
                                        <Col xs='6'>
                                            Consulte su boleta
                                        </Col>
                                        <Col xs='3'>
                                        </Col>
                                    </Row>
                                </Button>


                            </Card.Text>
                            {mostrarSalida && 
                                <Card.Footer>
                                    <a href='/admin' >Menú de operaciones</a>
                                    <a href='#' onClick={salir} style={{color: '#444444', marginLeft: '30px'}} >Cerrar Sesión</a>
                                </Card.Footer>
                            }

                        </Card>
                    </Form>

                    {/* <div className="custom-shape-divider-bottom-1663423624" style={{position: 'fixed'}}>
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
                            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
                            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
                        </svg>
                    </div> */}

            </Container>
        </React.Fragment>
    )
}

export default Main;