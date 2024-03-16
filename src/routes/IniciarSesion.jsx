import React, { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import axios from 'axios';

export default function IniciarSesion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Estado para controlar el error
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://vetesoft.com.py/veteadmin/api/auth/login/', {
        username: email,
        password
      });
      if(response.data) {
        localStorage.setItem('token', response.data.token);
        auth.setIsAuthenticated(true);
        return <Navigate to="/bienvenida" />;
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError("Usuario o contraseña incorrectos"); // Establecer el error
    }
  };

  if(auth.isAuthenticated){
    return <Navigate to="/bienvenida" />;
  }

  return ( 
    <DefaultLayout>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Iniciar Sesión</h1>

          <label htmlFor="email" className="label">Correo Electrónico</label> 
          <input type="text" id="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="password" className="label">Contraseña</label> 
          <input type="password" id="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />

          {error && <div className="error" style={{ color: 'red' }}>{error}</div>} {/* Mostrar el error si existe y aplicar estilo rojo */}
          
          <button type="submit" className="button">Ingresar</button>
        </form>
      </div>
    </DefaultLayout>
  );
}
