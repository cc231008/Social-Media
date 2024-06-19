import {useAuth} from "./AuthContext";
import {useNavigate} from "react-router-dom";

export default function DeletePost ({ postId }) {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:2999/posts/${postId}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({postId, userId: user.id}),
        });
        const data = await response.json();
        console.log('Deleted Post:', data);
        navigate('/home');
    }

    return (
        <div>
            <button onClick={handleDelete}>Delete Post</button>
        </div>
    )
}