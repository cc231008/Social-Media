import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import DeleteUser from "../components/DeleteUserButton";
import {useAuth} from "../components/AuthContext";

export default function Profile() {
    const { id } = useParams();
    const [client, setClient] = useState({});
    const { user } = useAuth();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`http://localhost:2999/users/${id}`);
                const result = await response.json();
                console.log(result)
                setClient(result);
            } catch (error) {
                console.log(error)
            }
        }
        getData();
    },[id]);


    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">
                        {client.name} {client.surname}
                    </h1>
                    {user && user.id ? (
                        <div className="flex space-x-4">
                            <Link
                                to={`/edit/${id}`}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
                            >
                                Edit
                            </Link>
                            <DeleteUser id={id} />
                        </div>
                    ) : null}
                </div>
                <div className="flex items-center justify-center mb-6">
                    <img
                        src={client.avatar}
                        alt={client.name}
                        className="w-32 h-32 object-cover rounded-full"
                    />
                </div>
                <div className="mb-4">
                    <p className="text-gray-700">
                        <span className="font-bold">Email:</span> {client.email}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-bold">Username:</span> {client.username}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-bold">Bio:</span> {client.bio}
                    </p>
                </div>
            </div>
        </div>
    );
}