import React, { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import axios from 'axios';

export default function Registrarse() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [nroDocumento, setNroDocumento] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [nroTelefono, setNroTelefono] = useState("");
    const [errors, setErrors] = useState({}); // Estado para controlar los errores
    const auth = useAuth();
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://vetesoft.com.py/veteadmin/api/auth/registro/', {
                first_name: nombre,
                last_name: apellido,
                nro_documento: nroDocumento,
                email,
                password,
                fecha_nacimiento: fechaNacimiento,
                nro_telefono: nroTelefono
            });
            console.log('Registro exitoso:', response.data);
            auth.setIsAuthenticated(true);
            return <Navigate to="/bienvenida" />;
        } catch (error) {
            console.error('Error al registrar:', error);
        }
    };

    if(auth.isAuthenticated){
      return <Navigate to="/bienvenida" />;
    }

    // Función para validar los campos de entrada
    const validateFields = () => {
        const errors = {};

        // Validar nombre
        if (!nombre.trim()) {
            errors.nombre = "Nombre es requerido";
        }

        // Validar apellido
        if (!apellido.trim()) {
            errors.apellido = "Apellido es requerido";
        }

        // Validar número de documento
        if (!nroDocumento.trim()) {
            errors.nroDocumento = "Número de documento es requerido";
        }

        // Validar email
        if (!email.trim()) {
            errors.email = "Correo electrónico es requerido";
        }

        // Validar contraseña
        if (!password.trim()) {
            errors.password = "Contraseña es requerida";
        } else if (password.length < 8) {
            errors.password = "La contraseña debe tener al menos 8 caracteres";
        }

        // Validar fecha de nacimiento
        if (!fechaNacimiento.trim()) {
            errors.fechaNacimiento = "Fecha de nacimiento es requerida";
        }

        // Validar número de teléfono
        if (!nroTelefono.trim()) {
            errors.nroTelefono = "Número de teléfono es requerido";
        }

        return errors;
    };

    // Manejar el cambio en los campos de entrada y actualizar los errores
    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors({ ...errors, [name]: undefined }); // Limpiar el error al cambiar el valor del campo
        switch (name) {
            case 'nombre':
                setNombre(value);
                break;
            case 'apellido':
                setApellido(value);
                break;
            case 'nroDocumento':
                setNroDocumento(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'fechaNacimiento':
                setFechaNacimiento(value);
                break;
            case 'nroTelefono':
                setNroTelefono(value);
                break;
            default:
                break;
        }
    };

    // Validar campos y manejar el envío del formulario
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Actualizar los errores si hay algún campo no válido
        } else {
            handleSubmit(e); // Enviar el formulario si no hay errores de validación
        }
    };

    return ( 
        <DefaultLayout>
            <div className="container">
                <div className="form-box">
                    <form className="form" onSubmit={handleFormSubmit}>
                        <h1>Registrarse</h1>
                        <label className="form-label">Nombre</label> 
                        <input type="text" className="form-input" name="nombre" value={nombre} onChange={handleChange} />
                        {errors.nombre && <div className="error-message" style={{ color: 'red', fontSize: '12px' }}>{errors.nombre}</div>} {/* Mostrar error si existe */}

                        <label className="form-label">Apellidos</label> 
                        <input type="text" className="form-input" name="apellido" value={apellido} onChange={handleChange} />
                        {errors.apellido && <div className="error-message" style={{ color: 'red', fontSize: '12px' }}>{errors.apellido}</div>} {/* Mostrar error si existe */}

                        <label className="form-label">Número de documento</label> 
                        <input type="text" className="form-input" name="nroDocumento" value={nroDocumento} onChange={handleChange} />
                        {errors.nroDocumento && <div className="error-message" style={{ color: 'red', fontSize: '12px' }}>{errors.nroDocumento}</div>} {/* Mostrar error si existe */}

                        <label className="form-label">Correo Electrónico</label> 
                        <input type="text" className="form-input" name="email" value={email} onChange={handleChange} />
                        {errors.email && <div className="error-message" style={{ color: 'red', fontSize: '12px' }}>{errors.email}</div>} {/* Mostrar error si existe */}

                        <label className="form-label">Contraseña</label> 
                        <input type="password" className="form-input" name="password" value={password} onChange={handleChange} />
                        {errors.password && <div className="error-message" style={{ color: 'red', fontSize: '12px' }}>{errors.password}</div>} {/* Mostrar error si existe */}
                        {password.length > 0 && password.length < 8 && <div className="error-message" style={{ color: 'red', fontSize: '12px' }}>La contraseña debe tener al menos 8 caracteres</div>}

                        <label className="form-label">Fecha de nacimiento</label> 
                        <input type="date" className="form-input" name="fechaNacimiento" value={fechaNacimiento} onChange={handleChange} />
                        {errors.fechaNacimiento && <div className="error-message" style={{ color: 'red', fontSize: '12px' }}>{errors.fechaNacimiento}</div>} {/* Mostrar error si existe */}

                        <label className="form-label">Número de teléfono</label> 
                        <input type="text" className="form-input" name="nroTelefono" value={nroTelefono} onChange={handleChange} />
                        {errors.nroTelefono && <div className="error-message" style={{ color: 'red', fontSize: '12px' }}>{errors.nroTelefono}</div>} {/* Mostrar error si existe */}

                        <button type="submit" className="form-button">Guardar</button>
                    </form>
                </div>
            </div>
        </DefaultLayout>
    );
}
