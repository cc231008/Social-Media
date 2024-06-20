import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Cookies from "js-cookie";

const RequireAuth = ({ children }) => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

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
                } else {
                    setUser(null);
                    navigate('/');
                }
            } else {
                setUser(null);
                navigate('/');
            }
        };

        fetchUser();
    }, [navigate, setUser]);

    return children;
};

export default RequireAuth;
