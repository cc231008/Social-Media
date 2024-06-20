import './App.css';
import {Suspense} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Loading from "./pages/Loading";
import EditUser from "./pages/EditUser";
import Uploads from "./pages/Uploads";
import EditPost from "./pages/EditPost";

export default function App() {

    return (
<div className="App">
            <Router>
                <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/posts/:postId" element={<EditPost />} />
                    <Route path="/clients/:id" element={<Profile />} />
                    <Route path="/edit/:id" element={<EditUser />} />
                    <Route path="/uploads" element={<Uploads />} />
                </Routes>
                </Suspense>
            </Router>
        </div>
    )
}







