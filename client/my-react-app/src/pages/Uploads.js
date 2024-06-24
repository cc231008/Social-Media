import {useAuth} from "../components/AuthContext";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

// This is the page where the user can add a new post.

export default function NewPost () {
    const { user } = useAuth(); // Logged in user.
    const [description, setDescription] = useState(''); // This is the description of the post.
    const [namePost, setNamePost] = useState(''); // This is the name (or alt) of the post.

    const navigate = useNavigate(); // This is a function that allows us to navigate to a different page.

    // This function is called when the user submits the form for adding a new post.
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert('You must be logged in to add a post.');
            return;
        }

        const formData = new FormData(); // This is a form data object that will be used to send the image data to the server.
        const fileField = document.querySelector('input[type="file"]'); // This is the file input field where the user selects the image to upload.

        if (fileField.files.length === 0) {
            alert('Please select an image file to upload.');
            return;
        }


        // This part of the code appends the image files, description, and name of the post to the form data object (or to formData).
        // The image files are appended as an array of files in order to support multiple image uploads.
        // Multiple image uploads are supported by the "multiple" attribute in the file input field.
        for (let i = 0; i < fileField.files.length; i++) {
            formData.append('imgPost', fileField.files[i]);
        }
        formData.append('description', description);
        formData.append('namePost', namePost);
        formData.append('userId', user.id);


        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/add`, {
                method: 'POST', // This is a POST request to add a new post.
                credentials: 'include', // This includes the user's credentials and cookies in the request.
                body: formData, // body sends the form data object to the server.
            });

            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.imgPost) {
                console.error('Image data not found in the response');
            }

           /*
           // This part of the code logs the image URLs to the console for debugging purposes.
            data.imgUrls.forEach(img => {
                console.log(`Image URL: ${img.url}`);
            });

            console.log('Image Upload Successful:', data);
            */

            navigate('/home'); // This navigates the user to the home page after the post is added.
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };


    return (
        <div className="max-w-lg mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Add New Post</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                    {
                        // This part is for the image upload field.
                    }
                    <label htmlFor="imgPost" className="block text-sm font-medium text-gray-700 mb-1">
                        Image Post:
                    </label>
                    <input
                        id="imgPost"
                        type="file"
                        multiple
                        accept="image/*"
                        name="imgPost"
                        className="hidden"
                    />
                    <label htmlFor="imgPost" className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg inline-block">
                        Choose Image
                    </label>
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