import {useAuth} from "../components/AuthContext";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
export default function NewPost () {
    const { user } = useAuth();
    const [imgPost, setImgPost] = useState('');
    const [description, setDescription] = useState('');
    const [namePost, setNamePost] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('You must be logged in to add a post.');
            return;
        }
        const response = await fetch('http://localhost:2999/posts/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify( {userId: user.id, imgPost, description, namePost}),
        });
        const data = await response.json();
        console.log('Added Post:', data);
        navigate('/home');
        }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Image:
                    <input
                        type="text"
                        name="imgPost"
                        value={imgPost}
                        onChange={(e) => setImgPost(e.target.value)}
                    />
                </label>
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
                <button type="submit">Add Post</button>
            </form>
        </div>
    )
}