import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import DeleteUser from "../components/DeleteUserButton";

export default function Profile() {
    const { id } = useParams();
    const [client, setClient] = useState({});

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
        <div>
            <h1>{client.name} {client.surname}</h1>
            <img id="picture" src={client.avatar} alt={client.name} />
            <p>{client.email}</p>
            <p>{client.username}</p>
            <p>{client.bio}</p>
            <DeleteUser id={id} />
            <Link to={`/edit/${id}`}>Edit</Link>
            <Link to="/home">Home</Link>
        </div>
    );
};