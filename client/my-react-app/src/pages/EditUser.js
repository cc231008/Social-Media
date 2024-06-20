import {useEffect, useState, useCallback} from "react";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";

export default function EditUser() {
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

    const fetchUser = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:2999/users/${id}`);
            const data = await response.json();
            setUser(data);
            console.log("Users are fetched:", data);
        } catch (error) {
            console.error('Error:', error);
        }
    }, [id]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

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
        <div className="max-w-xl mx-auto mt-8 px-4 py-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <h1 className="text-2xl font-bold text-gray-800 bg-gray-200 px-4 py-2">
                    Edit User
                </h1>
                <form onSubmit={handleSubmit} className="px-8 py-6">
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="surname"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Surname:
                        </label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={user.surname}
                            onChange={handleChange}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="bio"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Bio:
                        </label>
                        <input
                            type="text"
                            id="bio"
                            name="bio"
                            value={user.bio}
                            onChange={handleChange}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="avatar"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Avatar URL:
                        </label>
                        <input
                            type="text"
                            id="avatar"
                            name="avatar"
                            value={user.avatar}
                            onChange={handleChange}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}