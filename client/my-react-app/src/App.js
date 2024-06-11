import './App.css';
import {useEffect, useState} from "react";

export default function App() {
    const [clients, setClients] = useState([]);

    const getData = async () => {
        try {
            const response = await fetch('http://localhost:3000/users/');
            const result = await response.json();
            console.log(result)
            setClients(result);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData();
    },[]);
  return (
      <div>
        <header>
          <h1>My React App</h1>
        </header>
              {clients?.length > 0 ? (
                  clients.map(client => <div key={client.id}>
                        <h2>{client.name}</h2>
                      <p>{client.surname}</p>
                        <p>{client.email}</p>
                      <p>{client.username}</p>
                      image: <img src={client.avatar} alt={client.name} />
                  </div>)
              ) : (
                  <p>No clients found</p>
              )}
      </div>
  );
}

