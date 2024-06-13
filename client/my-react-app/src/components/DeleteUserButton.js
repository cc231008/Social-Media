import {useNavigate} from "react-router-dom";

export default function DeleteUser({id}) {
    const navigate = useNavigate();
    async function handleDelete() {
        try {
            const response = await fetch(`http://localhost:2999/users/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            console.log(data);
            navigate('/');
        } catch (error) {
            console.error("Error", error);
        }
    }
    return (
        <button onClick={handleDelete}>Delete</button>
    );
}