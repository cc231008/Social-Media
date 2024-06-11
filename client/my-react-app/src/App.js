import './App.css';
import {useEffect, useState} from "react";

export default function App() {
    const [message, setMessage] = useState('');

    const getData = async () => {
        try {
            const response = await fetch('http://localhost:3000/getData');
            const result = await response.json();
            console.log(result.message)
            setMessage(result.message);
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
        <main>
          <p>{message}</p>
        </main>
      </div>
  );
}

