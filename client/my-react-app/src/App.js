import './App.css';
import {Suspense} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Loading from "./pages/Loading";
import Edit from "./pages/Edit";

export default function App() {
/*
    const [clients, setClients] = useState([]);

    const getData = async () => {
        try {
            const response = await fetch('http://localhost:2999/users/');
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

    */
    return (
<div className="App">
            <Router>
                <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/clients/:id" element={<Profile />} />
                    <Route path="/edit/:id" element={<Edit />} />
                </Routes>
                </Suspense>
            </Router>
        </div>
    )
}







