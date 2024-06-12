import {Link} from "react-router-dom";

export default function Home({ clients }) {

    return (
        <div>
            <header>
                <h1>My React App</h1>
            </header>
            {clients?.length > 0 ? (
                clients.map(client => <div key={client.id}>
                    <p>{client.name}</p>
                    <p>{client.email}</p>
                    <Link to={`/clients/${client.id}`}>User's Profile</Link>
                </div>)
            ) : (
                <p>No clients found</p>
            )}
        </div>
    );
}