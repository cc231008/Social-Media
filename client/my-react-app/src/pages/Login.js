import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from '../components/AuthContext';

export default function Login() {
    const { setUser } = useAuth();
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


        /*
        console.log(client);
        if (client) {
            navigate(`/clients/${client.id}`);
        } else {
            alert('Invalid email or password')
        }
    }
         */

        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <label> Email: </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="type..."
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Login</button>
                </form>
                <p>{message}</p>
                <Link to="/register"> Register</Link>
            </div>
        );
}