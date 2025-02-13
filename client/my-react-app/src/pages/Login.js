import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from '../components/AuthContext';

// This is the page where the user can login to his account using his email and password.
export default function Login() {
    const { user, login } = useAuth(); // This is the logged in user.
    // This is the state that stores the user's email and password.
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Error or Success message created when login fails or succeeds to type right data for debugging purposes.
    const [message, setMessage] = useState('');

    const navigate = useNavigate(); // This is a function that allows us to navigate to a different page.

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (user) {
            navigate(`/clients/${user.id}`);
        }
    }, [user, navigate]);

    // This function is called when the user submits the form for logging in.
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await login(formData.email, formData.password);
        }
        catch (error) {
            setMessage('An error occurred: ' + error.message);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email:</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email..."
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Password:</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password..."
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition duration-200">
                            Login
                        </button>
                    </form>
                    <p className="mt-4 text-center text-red-500">{message}</p>
                    <p className="mt-4 text-center">
                        {!user && <Link to="/register" className="text-indigo-500 hover:underline">Don't have an account?</Link>}
                    </p>
                </div>
            </div>
        </div>
    );
}