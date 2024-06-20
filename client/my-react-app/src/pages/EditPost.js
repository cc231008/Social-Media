import {useAuth} from "../components/AuthContext";
import {useState} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import DeletePost from "../components/DeletePost";
export default function EditPost() {
    const { postId } = useParams();
    const { user } = useAuth();
    const [description, setDescription] = useState('');
    const [namePost, setNamePost] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:2999/posts/${postId}/edit`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify( {postId, userId: user.id, description, namePost}),
        });
        const data = await response.json();
        console.log('Added Post:', data);
        setUserId(data.userId)
        navigate('/home');
    }
    return (
        <div>
<h1>Edit Post</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    Name:
                    <input
                        type="text"
                        name="namePost"
                        value={namePost}
                        onChange={(e) => setNamePost(e.target.value)}
                    />
                </label>
                <button type="submit">Edit Post</button>
            </form>
            <DeletePost postId={postId} />
        </div>
    )
}