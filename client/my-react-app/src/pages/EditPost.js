import {useAuth} from "../components/AuthContext";
import {useState} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import DeletePost from "../components/DeletePost";
export default function EditPost() {
    const {postId} = useParams();
    const {user} = useAuth();
    const [description, setDescription] = useState('');
    const [namePost, setNamePost] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:2999/posts/${postId}/edit`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({postId, userId: user.id, description, namePost}),
        });
        const data = await response.json();
        console.log('Added Post:', data);

        navigate('/home');
    }
    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        className="w-full bg-indigo-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 transition duration-300 ease-in-out"
                    >
                        Edit Post
                    </button>
                </form>
                <DeletePost postId={postId}/>
            </div>
        </div>
    );
}