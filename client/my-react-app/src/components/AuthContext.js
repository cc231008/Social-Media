import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = Cookies.get('accessToken');
            if (token) {
                const response = await fetch('http://localhost:2999/me', {
                    credentials: 'include',
                });
                if (response.ok) {
                    const user = await response.json();
                    setUser(user);
                }
            }
        };
        fetchUser();
    }, []);


    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);