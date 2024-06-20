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
import Navbar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import {useAuth} from "./components/AuthContext";

export default function App() {
    const { user } = useAuth();

    return (
            <Router>
                <Suspense fallback={<Loading />}>
                    <div className="flex flex-col min-h-screen">
                        {user ?
                        <Navbar />
                        : null}
                        <div className="flex-1">
                <Routes>
                    <Route path="/" element={<Login />} />

                    <Route path="/register" element={<Register />} />

                    <Route path="/home" element={
                        <ProtectedRoute>
                        <Home />
                        </ProtectedRoute>
                    } />
                    <Route path="/posts/:postId" element={
                        <ProtectedRoute>
                        <EditPost />
                        </ProtectedRoute>
                    } />
                    <Route path="/clients/:id" element={
                        <ProtectedRoute>
                        <Profile />
                        </ProtectedRoute>
                    } />
                    <Route path="/edit/:id" element={
                        <ProtectedRoute>
                        <EditUser />
                        </ProtectedRoute>
                    } />
                    <Route path="/uploads" element={
                        <ProtectedRoute>
                        <Uploads />
                            </ProtectedRoute>
                    } />
                </Routes>
            </div>
                    </div>
                </Suspense>
            </Router>
    )
}







