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
        <div className="max-w-lg mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Add New Post</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="imgPost" className="block text-sm font-medium text-gray-700">
                        Image URL:
                    </label>
                    <input
                        id="imgPost"
                        type="text"
                        name="imgPost"
                        value={imgPost}
                        onChange={(e) => setImgPost(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        placeholder="Enter image URL"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description:
                    </label>
                    <input
                        id="description"
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        placeholder="Enter description"
                    />
                </div>
                <div>
                    <label htmlFor="namePost" className="block text-sm font-medium text-gray-700">
                        Post Name:
                    </label>
                    <input
                        id="namePost"
                        type="text"
                        name="namePost"
                        value={namePost}
                        onChange={(e) => setNamePost(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        placeholder="Enter post name"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                >
                    Add Post
                </button>
            </form>
        </div>
    );
}