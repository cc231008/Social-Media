import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// This is very important file that will be used to store the data of the user who is logged in or authenticated.
// It is used almost in every component that requires the user to be logged in.

// This is the context that will be used to store the user's data.
// If you are not familiar with the context API, you can read more about it here: https://reactjs.org/docs/context.html
const AuthContext = createContext();

export const AuthProvider = ({ children }) => { // This is the provider that will be used to wrap the application.
    const [user, setUser] = useState(null); // This is the user's data that will be stored in the context.

    useEffect(() => {
        const fetchUser = async () => {
            const token = Cookies.get('accessToken'); // This is the token that is stored in the cookies, and we get it here to check if the user is logged in.
            // If the token exists, then we can fetch the user's data from the server.
            if (token) {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/me`, { // This is the endpoint that we use to get the user's data. You can check the server code to see how it is implemented.
                    credentials: 'include',
                });
                if (response.ok) {
                    const user = await response.json();
                    setUser(user); // This sets the user's data in the context.
                }
            }
        };
        fetchUser();
    }, []);

    // We pass <AuthContext.Provider> to the index.js file, so that it wraps the entire application. This way, the user's data can be accessed from any component.
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);