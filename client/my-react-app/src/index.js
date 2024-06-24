import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "./components/AuthContext";

const root = ReactDOM.createRoot(document.getElementById('root'));

// Here, we put AuthProvider, which was taken from AuthContext, so that the user's data can be accessed from any component.
root.render(
    <AuthProvider>
        <App />
    </AuthProvider>,
);

reportWebVitals();
