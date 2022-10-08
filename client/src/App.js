import './App.css';
import { Route, Routes } from "react-router-dom";
import Main from './Main';
import { useState } from 'react';
import UserContext from './components/contextos/user-context';
import Login from './components/register/Login';
import Register from './components/register/Register';
import NuevoUsuario from './components/admin/NuevoUsuario';
import MainAdmin from './components/MainAdmin';
import EditarUsuario from './components/admin/EditarUsuario';
import IngresarLectura from './components/admin/IngresarLectura';
import EditarLectura from './components/admin/EditarLectura';
import ReadingList from './components/ReadingList';


function App() {

  const dir = 'consumers/';

  const [usuario,setUsuario] = useState();

  return (

      <UserContext.Provider  value={{usuario, setUsuario}}>

        <div 
          className="App" 
          style={{
            overflow: 'auto',
            margin: '0',
            padding: '0',
            height: 'auto'
          }}>

            <Routes>

              <Route 
                path='/login' 
                element={
                  <Login dir={dir} />
                }>
              </Route>
              
              <Route 
                path='/usuario' 
                element={
                  <Register dir={dir} />
                }>
              </Route>
              
              <Route 
                path="/*" 
                element={
                  <Main dir={dir} />
                } 
              />
              
              <Route 
                path="/readings/:id/:id2" 
                element={
                  <ReadingList dir={dir} />
                } 
              />


{/* RUTAS DE ADMINISTRADOR */}

              <Route 
                path="/admin" 
                element={
                  <MainAdmin 
                    dir={dir} />
                } />

              <Route 
                path='/admin/nuevousuario' 
                element={
                  <NuevoUsuario 
                    dir={dir} />
                }>
              </Route>
              
              <Route 
                path='/admin/editarusuario' 
                element={
                  <EditarUsuario 
                    dir={dir} />
                }>
              </Route>
              
              <Route 
                path='/admin/ingresarlectura' 
                element={
                  <IngresarLectura 
                    dir={dir} />
                }>
              </Route>
              
              <Route 
                path='/admin/editarlectura' 
                element={
                  <EditarLectura 
                    dir={dir} />
                }>
              </Route>
            </Routes>
        </div>
      </UserContext.Provider>
  );
}

export default App;
