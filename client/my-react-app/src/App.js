import './App.css';
import {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./components/Login";

export default function App() {
    const [clients, setClients] = useState([]);

    const getData = async () => {
        try {
            const response = await fetch('http://localhost:3000/users/');
            const result = await response.json();
            console.log(result)
            setClients(result);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData();
    },[]);


    return (
<div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<LoginWrapper clients={clients} />} />
                    <Route path="/home" element={<Home clients={clients} />} />
                    <Route path="/clients/:id" element={<Profile clients={clients} />} />
                </Routes>
            </Router>
        </div>
    )
}

function LoginWrapper({ clients, client }) {
    const navigate = useNavigate();
    return <Login clients={clients} client={client} navigate={navigate} />;
}



