import {useNavigate} from "react-router-dom";
import {useAuth} from "./AuthContext";

// This is a button that allows the user to delete his profile. It is used in the EditUser page.
export default function DeleteUser({id}) { // This is the id of the user, which we pass as a prop, so we can delete the user with that id.
    const navigate = useNavigate();
    const { setUser } = useAuth();
    async function handleDelete() {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setUser(null);
                navigate('/login'); // Redirect to the login page.
            }
        } catch (error) {
            console.error("Error", error);
        }
    }
    return (
        <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow"
        >
            Delete
        </button>
    );
}