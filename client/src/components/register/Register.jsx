import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBarAPR from '../NavBarAPR';
// REACT BOOTSTRAP
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';


const initialData = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: ''

}


const Register = (props) => {

    const dir = props.dir;
    const [formulario, setFormulario] = useState(initialData);
    const navigate = useNavigate();

    const updateForm = ({target: {name, value}}) => {
        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    const send = e => {
        e.preventDefault();
        axios.post("/api/"+dir+"usuario", formulario)
            .then(resp => {
                if(!resp.data.error) {
                    alert('Usuario registrado exitosamente');
                    navigate('/login')
                } else {
                    alert('Ha ocurrido un error')
                }
            })
    }

    return(
        <React.Fragment>

            <Container className='d-flex flex-wrap flex-column justify-content-start align-items-center' style={{height: '100vh'}}>

                <NavBarAPR/>

                <Form className="FormRegister mt-5" onSubmit={send}
                    style={{
                        width: '50%',
                        minWidth: '360px',
                        position: 'absolute',
                        top: '15%'
                    }}
                >

                    <Form.Group as={Row} className="mb-3">

                        <Form.Label column xs={4}>
                            Nombre
                        </Form.Label>

                        <Col xs={8}>
                            <Form.Control 
                                name='nombre' 
                                type="text" 
                                required
                                value={formulario.nombre}
                                placeholder="nombre" 
                                onChange={updateForm} />
                        </Col>
                    </Form.Group>
                    
                    <Form.Group as={Row} className="mb-3">

                        <Form.Label column xs={4}>
                            Apellido
                        </Form.Label>

                        <Col xs={8}>
                            <Form.Control 
                                name='apellido' 
                                type="text" 
                                required
                                value={formulario.apellido}
                                placeholder="apellido" 
                                onChange={updateForm} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">

                        <Form.Label column xs={4}>
                            Email
                        </Form.Label>

                        <Col xs={8}>
                            <Form.Control 
                                name='email' 
                                type="email" 
                                required
                                value={formulario.email} 
                                placeholder="example@example.com" 
                                onChange={updateForm} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">

                        <Form.Label column xs={4}>
                            Contraseña
                        </Form.Label>

                        <Col xs={8}>
                            <Form.Control 
                                name='password' 
                                type="password" 
                                minLength={3}
                                value={formulario.password}
                                placeholder="password" 
                                onChange={updateForm} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">

                        <Form.Label column xs={4}>
                            Confirme contraseña
                        </Form.Label>

                        <Col xs={8}>
                            <Form.Control 
                                name='confirmPassword' 
                                type="password" 
                                minLength={3}
                                value={formulario.confirmPassword}
                                placeholder="Confirm password" 
                                onChange={updateForm} />
                        </Col>
                    </Form.Group>

                    <Button className='mt-2 mb-2' type='submit'
                        style={{
                            minWidth: '180px'
                        }}
                    >
                        Register
                    </Button>

                    <div className='d-flex flex-column align-items-center'>
                        <Button className='mt-3 mb-3' type='submit' variant='info'
                            style={{
                                minWidth: '180px'
                            }}
                    >
                        Login
                        </Button>

                        <Link to="/">Volver</Link>

                        <Link to={'/login'}>Ingresar</Link>
                    </div>
                </Form>
            </Container>

        </React.Fragment>
    )
}

export default Register;