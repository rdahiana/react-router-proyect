
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import IniciarSesion from './routes/IniciarSesion.jsx';
import Registrarse from './routes/Registrarse.jsx';
import Bienvenida from './routes/Bienvenida.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import { AuthProvider } from './auth/AuthProvider.jsx';
import './index.css';


const router = createBrowserRouter ([
{
  path: "/",
  element: <IniciarSesion />,
}, 
{
  path: "/registrar",
  element: <Registrarse />,
},
{
  path: "/",
  element: <ProtectedRoute />,
  children : [
    {
      path:"/Bienvenida",
      element : <Bienvenida/>, 
    }
  ]
},
])
//esta es la parte que se encarga de renderizar la app 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
// esta sección de código se encarga de configurar el punto de entrada de la aplicación React, activar el modo
// estricto de React, proporcionar un contexto de autenticación y configurar el enrutador de la aplicación con las 
//rutas definidas. Una vez configurado, la aplicación se renderiza en el DOM dentro del elemento con el id 'root'
