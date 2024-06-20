import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from '../components/AuthContext';

export default function Login() {
    const { user, setUser } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch('http://localhost:2999/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok) {
                    setMessage('Login successful!');
                    console.log('User logged in:', data);
                    setUser(data);
                    navigate(`/clients/${data.id}`);
                    // Redirect or navigate to protected page
                } else {
                    setMessage('Login failed: ' + data.error);
                }
            } catch
            (error)
            {
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