import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Mock de usuarios válidos
const VALID_USERS = {
  admin: 'admin123',
  user: 'user123',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar sesión desde localStorage al montar
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Función login
  const login = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 800));

      // Validar credenciales
      if (VALID_USERS[username] === password) {
        const userData = {
          id: Math.random().toString(36).substr(2, 9),
          username,
          email: `${username}@example.com`,
          fullName: username.charAt(0).toUpperCase() + username.slice(1),
        };

        // Generar token simulado
        const newToken = `Bearer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Guardar en estado
        setToken(newToken);
        setUser(userData);

        // Guardar en localStorage
        localStorage.setItem('authToken', newToken);
        localStorage.setItem('authUser', JSON.stringify(userData));

        return { success: true, user: userData };
      } else {
        const errorMsg = 'Usuario o contraseña incorrectos';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (err) {
      console.error('Error en login:', err);
      setError('Error al iniciar sesión');
      return { success: false, error: 'Error al iniciar sesión' };
    } finally {
      setLoading(false);
    }
  };

  // Función logout
  const logout = () => {
    setToken(null);
    setUser(null);
    setError(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  // Función para obtener datos protegidos
  const fetchProtectedData = async () => {
    if (!token) {
      return { success: false, error: 'No hay token' };
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      return {
        success: true,
        data: {
          message: 'Datos protegidos accedidos correctamente',
          user: user,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (err) {
      return { success: false, error: 'Error al obtener datos protegidos' };
    }
  };

  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!token,
    login,
    logout,
    fetchProtectedData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
