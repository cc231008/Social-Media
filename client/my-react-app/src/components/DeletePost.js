import {useAuth} from "./AuthContext";
import {useNavigate} from "react-router-dom";

// This is a button that allows the user to delete his post. It is used in the Post page.
export default function DeletePost ({ postId }) {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleDelete = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({postId, userId: user.id}),
        });
        if (response.ok) navigate('/home'); // Redirect to the home page.
    }

    return (
        <div className="mt-4">
            <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-red-500"
            >
                Delete Post
            </button>
        </div>
    );
}