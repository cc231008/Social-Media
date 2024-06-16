import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";

export default function Edit() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        username: '',
        bio: '',
        avatar: ''
    });

    async function fetchUser() {
        try {
            const response = await fetch(`http://localhost:2999/users/${id}`);
            const data = await response.json();
            setUser(data);
            console.log("Users are fetched:", data);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    useEffect(() => {
        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:2999/users/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();
            console.log(data);
            navigate(`/clients/${id}`);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={user.name} onChange={handleChange} />
                <label>Surname:</label>
                <input type="text" name="surname" value={user.surname} onChange={handleChange} />
                <label>Email:</label>
                <input type="email" name="email" value={user.email} onChange={handleChange} />
                <label>Username:</label>
                <input type="text" name="username" value={user.username} onChange={handleChange} />
                <label>Bio:</label>
                <input type="text" name="bio" value={user.bio} onChange={handleChange} />
                <label>Avatar:</label>
                <input type="text" name="avatar" value={user.avatar} onChange={handleChange} />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}