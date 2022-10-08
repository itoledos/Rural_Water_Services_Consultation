import axios from 'axios';
import React, { useContext, useState } from 'react';
import UserContext from "../contextos/user-context";
import NavBarAPR from '../NavBarAPR';
// REACT ROUTER DOM
import { Link, useNavigate } from 'react-router-dom';
// REACT BOOTSTRAP
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/Form';


const initialData = {
    username: '',
    password: '',
}


const Login = (props) => {

    const dir = props.dir;
    const [formulario, setFormulario] = useState(initialData);
    const context = useContext(UserContext)
    const navigate = useNavigate();

    const updateForm = ({target: {name, value}}) => {
        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    const login = e => {
        e.preventDefault("/api/"+dir+"login");
        console.log()
        axios.post("/api/"+dir+"login", formulario)
            .then(resp => {
                if(!resp.data.error) {
                    context.setUsuario(resp.data.datos);
                    sessionStorage.setItem('USUARIO', JSON.stringify(resp.data.datos));
                    navigate('/admin');
                } else {
                    alert('Error en Login: '+resp.msg)
                }
            })
    }

    return(

        <React.Fragment>
            <Container className='d-flex flex-wrap flex-column justify-content-start align-items-center' style={{height: '100vh'}}>
                <NavBarAPR/>

                <Form className="FormRegister w-50 mt-5" onSubmit={login}
                    style={{
                        position: 'absolute',
                        top: '10%'
                    }}
                >
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={4}>
                            Email
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control 
                                name='username' 
                                type="username" 
                                required
                                value={formulario.username} 
                                placeholder="username" 
                                onChange={updateForm} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={4}>
                            Contraseña
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control 
                                name='password' 
                                type="password" 
                                minLength={3}
                                value={formulario.password} 
                                placeholder="password" 
                                onChange={updateForm} />
                        </Col>
                    </Form.Group>
                    <div className='d-flex flex-column align-items-center'>
                        <Button className='mt-3' type='submit'
                            style={{
                                minWidth: '180px'
                            }}
                        >
                        Login
                        </Button>
                        <Link to="/">Volver</Link>
                        <Link to="/usuario">Registrarse</Link>
                    </div>
                </Form>

            </Container>
        </React.Fragment>

    )
}

export default Login;