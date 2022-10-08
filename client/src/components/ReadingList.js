import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBarAPR from "./NavBarAPR";
// REACT ROUTER DOM
import { useNavigate, useParams } from 'react-router-dom';
// REACT BOOTSTRAP
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';

const InitialReading = {
    userID: '',
    rolProp: '',
    meterID: '',
    anio: 1950,
    mes: '',
    medicion: '',
}

const InitialUser = {
    userID: '',
    name: '',
    address: '',
    mail: '',
    phone: 900000000,
    meterID: '',
    member: false,
    active: true
}

const tarifa = [400,600,1200];


const ReadingList = (props) => {

    const {id, id2} = useParams();

    const [lectura,setLectura] =useState(
        InitialReading
    );
    const [lecturaAnterior,setLecturaAnterior] =useState(
        InitialReading
    );
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [usuarios, setUsuarios] = useState(
        InitialUser
    );

    const navigate = useNavigate();

    useEffect(()=>{
        
        axios.get('/api/readings/'+id)
        .then(res=>{
            setLectura(res.data.justOne);
        })
        
        axios.get('/api/readings/'+id2)
        .then(res=>{
            setLecturaAnterior(res.data.justOne);
        })
        
        axios.get('/api/consumers/all')
        .then(res=>{
            let datos=res.data.all;
            setUsuarios(datos.find(e=>e.userID==lectura.userID));
        })

    },[])
    
    const pago = (actual, anterior) => {
        let dif = actual - anterior;
        if(dif<=10) {
            return(dif*tarifa[0])
        } else if(dif <= 15){
            return(10*tarifa[0] + (dif-10)*tarifa[1])
        } else {
            return(10*tarifa[0] + 5*tarifa[1] + (dif-15)*tarifa[2])
        }

    }
  
    return(
        <React.Fragment>
            <Container 
                className=' d-flex flex-column justify-content-start align-items-center mb-0'
                style={{
                    height: '100vh'
                }}
            >
                <NavBarAPR/>

                <Card
                    style={{
                        position: 'relative',
                        top: '15%',
                        width: '50%',
                        minWidth: '370px'
                    }}
                >
                    <Card.Header>
                        <h2>Boleta período {lectura.mes}/{lectura.anio}</h2>
                    </Card.Header>
                    <Card.Body>
                        <Table>
                            <thead style={{borderTop: '4px solid gray'}}>
                                <tr>
                                    <th>Datos usuario</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody style={{borderTop: '4px solid gray'}}>
                                <tr>
                                    <td>Rol propiedad: </td>
                                    <td>{lectura.rolProp}</td>
                                </tr>
                                <tr>
                                    <td>Número de Usuario: </td>
                                    <td>{lectura.userID}</td>
                                </tr>
                                <tr>
                                    <td>ID de medidor: </td>
                                    <td>{lectura.meterID}</td>
                                </tr>

                            </tbody>
                            <thead style={{borderTop: '4px solid gray'}}>
                                <tr>
                                    <th>Ítem</th>
                                    <th>Cantidad</th>
                                </tr>
                            </thead>
                            <tbody style={{borderTop: '4px solid gray'}}>
                                <tr>
                                    <td>Lectura actual ({lectura.mes}/{lectura.anio}): </td>
                                    <td>{lectura.medicion} m3</td>
                                </tr>
                                <tr>
                                    <td>Lectura anterior ({lecturaAnterior.mes}/{lecturaAnterior.anio}): </td>
                                    <td>{lecturaAnterior.medicion} m3</td>
                                </tr>
                                <tr>
                                    <td>Consumo del período: </td>
                                    <td>{lectura.medicion-lecturaAnterior.medicion} m3</td>
                                </tr>
                                <tr>
                                    <td><b>Total a pagar</b></td>
                                    <td><b>$ {pago(lectura.medicion, lecturaAnterior.medicion)}</b></td>
                                </tr>
                            </tbody>
                            <tfoot style={{
                                    fontSize: '0.8em', 
                                    borderTop: '4px solid gray', 
                                    textAlign: 'initial'}}>
                                <tr>
                                    <td style={{paddingLeft: '10px'}}>
                                        Tramos tarifarios
                                        <ul>
                                            <li>0 a 10 m3  ................${tarifa[0]}</li>
                                        </ul>
                                        <ul>
                                            <li>entre 10 y 15 m3  ....${tarifa[1]}</li>
                                        </ul>
                                        <ul>
                                            <li>más de 15 m3  .........${tarifa[2]}</li>
                                        </ul>
                                    </td>
                                    <td></td>
                                </tr>
                            </tfoot>

                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </React.Fragment>

    )
}
export default ReadingList;
