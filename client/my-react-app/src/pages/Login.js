import {useState} from "react";

export default function Login({ clients, navigate }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const client = clients.find(client => client.email === email && client.password === password);
        console.log(client);
        if (client) {
            navigate(`/clients/${client.id}`);
        } else {
            alert('Invalid email or password')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="text"
                        placeholder="type..."
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="text"
                        placeholder="type..."
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}