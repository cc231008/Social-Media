import {useAuth} from "../components/AuthContext";
import {useState} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import DeletePost from "../components/DeletePost"; // Go to the DeletePost.js file in the components folder to see how it works.

// This is the page where the user can edit his own post.
export default function EditPost() {
    const {postId} = useParams(); // This is the id of the post that the user wants to edit.
    const {user} = useAuth(); // Logged in user.
    const [description, setDescription] = useState('');
    const [namePost, setNamePost] = useState('');
    const navigate = useNavigate(); // This is a function that allows us to navigate to a different page.

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}/edit`, {
            method: 'PATCH', // This is a PATCH request to edit the post.
            headers: {
                'Content-Type': 'application/json', // This is the type of data that is being sent to the server.
            },
            credentials: 'include', // This includes the user's credentials and cookies in the request.
            body: JSON.stringify({postId, userId: user.id, description, namePost}), // This is the data that is being sent to the server.
        });

        if (response.ok) navigate('/home'); // Redirect to the home page.
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