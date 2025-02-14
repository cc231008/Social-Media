import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

// This is a custom component that was designed to protect routes from unauthorized access.
// So if you try to access a protected route without being logged in, you will be redirected back to the login page.
const ProtectedRoute = ({ children }) => {
    const { user } = useAuth(); // This is the logged in user.
    const location = useLocation(); // This is the current location of the user.

    // If the user is not logged in, then redirect him to the login page.
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoute;