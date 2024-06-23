import {useAuth} from "../components/AuthContext";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
export default function NewPost () {
    const { user } = useAuth();
    const [description, setDescription] = useState('');
    const [namePost, setNamePost] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert('You must be logged in to add a post.');
            return;
        }

        const formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');

        if (fileField.files.length === 0) {
            alert('Please select an image file to upload.');
            return;
        }

        for (let i = 0; i < fileField.files.length; i++) {
            formData.append('imgPost', fileField.files[i]);
        }
        formData.append('description', description);
        formData.append('namePost', namePost);
        formData.append('userId', user.id);

        try {
            const response = await fetch('http://localhost:2999/posts/add', {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });

            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.imgPost) {
                console.error('Image data not found in the response');
            }

            data.imgUrls.forEach(img => {
                console.log(`Image URL: ${img.url}`);
            });

            console.log('Image Upload Successful:', data);
            navigate('/home');
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };


    return (
        <div className="max-w-lg mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Add New Post</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="imgPost" className="block text-sm font-medium text-gray-700">
                        Image Post:
                    </label>
                    <input
                        id="imgPost"
                        type="file"
                        multiple
                        accept="image/*"
                        name="imgPost"
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