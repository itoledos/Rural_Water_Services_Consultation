import React, { useContext, useEffect, useState } from "react";
import UserContext from "./contextos/user-context";
import { useNavigate } from 'react-router-dom';
// REACT BOOTSTRAP
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
// REACT ICONS
import { FaUserEdit } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import { BiMessageSquareAdd } from 'react-icons/bi';

const InitialData = {

    userID: '',
    name: '',
    address: '',
    mail: '',
    phone: '',
    meterID: '',
    member: false,
    active: true
};

const MainAdmin = (props) => {

    useEffect(()=> {
        if(!context.usuario){
        if(sessionStorage.getItem('USUARIO')){
            context.setUsuario(JSON.parse(sessionStorage.getItem('USUARIO')));
        }
        else {
          navigate('/login');
        }
        } 
        else {
        sessionStorage.setItem('USUARIO', JSON.stringify(context.usuario)); 
        }
    }
    , [])

    const context = useContext(UserContext)

    const navigate=useNavigate();
    const [form, setForm] = useState(
        InitialData
    );

    const salir = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('USUARIO');
        navigate('/');
    }

    return(
        <React.Fragment>
            
            <Container  className='w-50'
                style={{
                    minWidth: '360px'
                }}
            >

                <Card className='w-100 mt-5' border='light' style={{boxShadow: '1px 1px 10px 2px #D1D1D1'}}>

                    <Card.Header as='h1' style={{background: '#ffffff', color: '#666666'}}>
                        Administrador de Información
                    </Card.Header>

                    <Card.Body>

                        <Card.Title as='h3' style={{color: '#666666'}}>Menú de operaciones</Card.Title>
                            <Row>
                                <Col className='d-flex flex-row justify-content-center'>
                                    <Button href="/admin/ingresarlectura" 
                                            className="mb-5 mt-5 w-75 d-flex flex-row justify-content-evenly align-items-center" 
                                            variant="outline-success"
                                            size="lg"
                                            style={{height: '75px', minWidth: '250px'}}>
                                        <BiMessageSquareAdd/> Ingresar Lectura
                                    </Button>
                                </Col>

                                <Col className='d-flex flex-row justify-content-center'>
                                    <Button href="/admin/editarlectura" 
                                            className="mb-5 mt-5 w-75 d-flex flex-row justify-content-evenly align-items-center" 
                                            variant="outline-secondary"
                                            size="lg"
                                            style={{height: '75px',  minWidth: '250px'}}>
                                        <BsPencilSquare/> Modificar Lectura
                                    </Button>
                                </Col>
                            </Row>

                            <Row>
                                <Col className='d-flex flex-row justify-content-center'>

                                    <Button href="/admin/nuevousuario" 
                                            className="mb-5 mt-5 w-75 d-flex flex-row justify-content-evenly align-items-center" 
                                            variant="outline-warning"
                                            size="lg"
                                            style={{height: '75px',  minWidth: '250px'}}>
                                                <FaUserEdit/> Agregar Usuario
                                    </Button>
                                </Col>
                                <Col className='d-flex flex-row justify-content-center'>
                                    <Button href="/admin/editarusuario" 
                                            className="mb-5 mt-5 w-75 d-flex flex-row justify-content-evenly align-items-center" 
                                            variant="outline-secondary"
                                            size="lg"
                                            style={{height: '75px',  minWidth: '250px'}}>
                                        <FaUserEdit/>   Editar Usuario
                                    </Button>
                                </Col>
                            </Row>
                    </Card.Body>

                    <Card.Footer>
                        <Row>
                            <Col>
                                <a href='/' >Volver a Página principal</a>
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



export default MainAdmin;