// "Suspense" is a component that is used to wrap around the components that are being loaded asynchronously. It helps to handle the loading state of the components.
import {Suspense} from "react";

// "BrowserRouter" is a component that provides the routing functionality to the application. It helps to navigate between different pages of the application.
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';

// This is the list of the pages that are being imported in the application.
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Loading from "./pages/Loading";
import EditUser from "./pages/EditUser";
import Uploads from "./pages/Uploads";
import EditPost from "./pages/EditPost";
import Navbar from "./components/NavBar";

// "ProtectedRoute" is a custom component that was designed to protect routes from unauthorized access.
import ProtectedRoute from "./components/ProtectedRoute";
// "useAuth" is a custom hook that was designed to provide the user's authentication status. In other words, it checks if the user is logged in or not.
import {useAuth} from "./components/AuthContext";

/*
This page is the main page of the application. It contains the routes for the different pages of the application.
 */
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
                    <Route path="/login" element={<Login />} />

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
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </div>
                    </div>
                </Suspense>
            </Router>
    )
}







