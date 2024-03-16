//Un componente que va a guardar todos los estados y las funciones que vamos a necesitar

import React, { createContext, useState, useContext } from "react";

// Crear el contexto de autenticación
const AuthContext = createContext();

// Definir el componente del proveedor de autenticación
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

// Exportar el contexto para su uso en otros componentes 
export const useAuth = () => useContext(AuthContext); //hook
