import React, { createContext, useContext, useState} from 'react';

// This is very important file that will be used to store the data of the user who is logged in or authenticated.
// It is used almost in every component that requires the user to be logged in.

// This is the context that will be used to store the user's data.
// If you are not familiar with the context API, you can read more about it here: https://reactjs.org/docs/context.html
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => { // This is the provider that will be used to wrap the application.
    const [user, setUser] = useState(null); // This is the user's data that will be stored in the context.
    const login = async (email, password) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });
            if (response.ok) {
                const user = await response.json();
                console.log('User:', user);
                setUser(user);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    // We pass <AuthContext.Provider> to the index.js file, so that it wraps the entire application. This way, the user's data can be accessed from any component.
    return (
        <AuthContext.Provider value={{ user, setUser, login }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext); // This is a custom hook that will be used to access the user's data from any component.