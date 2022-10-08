import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import UserContext from "../contextos/user-context";
import { useNavigate } from 'react-router-dom';
// REACT BOOTSTRAP
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
// REACT ICONS
import { BiUpload } from 'react-icons/bi';
// OTROS
import Swal from 'sweetalert2';

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

const NuevoUsuario = (props) => {

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

    const updateForm = ({target: {name, value}}) => {
        setForm({
            ...form,
            [name]: value
        });
        }

    const updateCheckbox = ({target: {name, checked}}) => {
        setForm({
            ...form,
            [name]: checked
        });
        }

    const salir = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('USUARIO');
        navigate('/');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/consumers/new', 
           form
        )
        .then(res=>{
            if(form.userID.toString().length<1||form.rolProp.toString().length<1||form.name.toString().length<1||form.address.toString().length<1||form.mail.toString().length<1||form.phone.toString().length<1||form.meterID.toString().length<1){
                console.log(Swal.fire(`Todos los campos son requeridos`))
            } else {
                Swal.fire(`Usuario añadido exitosamente`);
                navigate('/admin')
            }
        })
        .catch(err=>{
            alert(err);
            console.log(err);
        })
    }

    return(
        <React.Fragment>

            <Container>

                <Card className='w-100 mt-2' border='light' style={{boxShadow: '1px 1px 10px 2px #D1D1D1'}}>

                    <Card.Header as='h2' style={{background: '#ffffff', color: '#666666'}}>
                        Administrador de Información
                    </Card.Header>

                    <Card.Body>

                        <Card.Title as='h4' style={{color: '#666666', marginBottom: '20px'}}>
                            Crear nuevo usuario
                        </Card.Title>

                        <Form onSubmit={handleSubmit} style={{fontSize: '1em'}}>

                            <Container as={Row} style={{padding: '0px'}}>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3 w-75"
                                            style={{minWidth: '300px'}}
                                        >

                                            <Form.Label className="d-flex flex-wrap justify-content-start mb-0">
                                                ID Usuario: 
                                            </Form.Label>

                                            <Form.Control
                                                type="text" 
                                                name ="userID"
                                                value = {form.userID} 
                                                placeholder="Ingrese ID Usuario" 
                                                size="sm"
                                                onChange={updateForm}
                                            />
                                        </Form.Group>
                                    </Col>
                                    
                                    <Col>
                                        <Form.Group className="mb-3 w-75" style={{minWidth: '300px'}}>

                                            <Form.Label className="d-flex flex-wrap justify-content-start mb-0">
                                                Rol de la propiedad: 
                                            </Form.Label>

                                            <Form.Control
                                                type="text" 
                                                name ="rolProp"
                                                value = {form.rolProp} 
                                                placeholder="Ingrese rol de propiedad" 
                                                size="sm"
                                                onChange={updateForm} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3 w-75" style={{minWidth: '300px'}}>

                                            <Form.Label className="d-flex flex-wrap justify-content-start mb-0">
                                                Nombre Usuario: 
                                            </Form.Label>

                                            <Form.Control 
                                                type="text" 
                                                name="name" 
                                                value={form.name}
                                                placeholder="Ingrese nombre de Usuario/a" 
                                                size="sm"
                                                onChange={updateForm} />
                                        </Form.Group>
                                    </Col>

                                    <Col>

                                        <Form.Group className="mb-3 w-75" style={{minWidth: '300px'}}>

                                            <Form.Label className="d-flex flex-wrap justify-content-start mb-0">
                                                Mail: 
                                            </Form.Label>

                                            <Form.Control 
                                                type="text" 
                                                name="mail" 
                                                value={form.mail}
                                                placeholder="ejemplo@ejemplo.com" 
                                                size="sm"
                                                onChange={updateForm} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Form.Group className="mb-3 w-75" style={{minWidth: '300px'}} >

                                        <Row className="mb-0 w-50">
                                            <Form.Label className="d-flex flex-wrap justify-content-start mb-0">
                                                Dirección: 
                                            </Form.Label>
                                        </Row>

                                        <Form.Control 
                                            type="text" 
                                            name="address" 
                                            value={form.address}
                                            placeholder="Nombre calle, Número, Sector" 
                                            size="sm"
                                            onChange={updateForm} />
                                    </Form.Group>
                                    
                                </Row>

                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3 w-75" style={{minWidth: '300px'}} >

                                            <Form.Label className="d-flex flex-wrap justify-content-start mb-0">
                                                Teléfono: 
                                            </Form.Label>

                                            <Form.Control 
                                                type="number" 
                                                name="phone" 
                                                value={form.phone}
                                                min={900000000}
                                                max={999999999}
                                                placeholder="900000000" 
                                                size="sm"
                                                onChange={updateForm} />
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group className="mb-3 w-75" style={{minWidth: '300px'}} >

                                            <Form.Label className="d-flex flex-wrap justify-content-start mb-0">
                                                Identificador del medidor: 
                                            </Form.Label>

                                            <Form.Control 
                                                type="text" 
                                                name="meterID" 
                                                value={form.meterID}
                                                placeholder="######" 
                                                size="sm"
                                                onChange={updateForm} />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row >
                                    <Col>
                                        <Form.Group className="w-75 d-flex flex-wrap justify-content-center mb-0">

                                            <Form.Check 
                                                type="checkbox"
                                                name="member" 
                                                label="Socio?"
                                                checked={form.member}
                                                size="sm"
                                                onChange={updateCheckbox} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                    </Col>
                                </Row>

                                <div className="w-100 d-flex flex-column align-items-center" >
                                    <Button 
                                        className="d-flex flex-wrap flex-column align-items-center mb-1 w-25" 
                                        variant="success" type="submit" size='sm'
                                        style={{minWidth: '200px'}}>

                                        <BiUpload/> Agregar Usuario
                                    </Button>

                                </div>
                            </Container>

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



export default NuevoUsuario;