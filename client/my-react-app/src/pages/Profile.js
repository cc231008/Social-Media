import {useParams} from "react-router-dom";

export default function Profile({ clients }) {
    const { id } = useParams();
    const client = clients.find(client => client.id === parseInt(id));
    if (!client) {
        return <h1>Client not found</h1>;
}

    return (
        <div>
            <h1>{client.name} {client.surname}</h1>
            <img src={client.avatar} alt={client.name} />
            <p>{client.email}</p>
            <p>{client.username}</p>
        </div>
    );
};