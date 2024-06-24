import {useEffect, useState, useCallback} from "react";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";

// This is the page where the user can edit his profile information.
export default function EditUser() {
    const navigate = useNavigate(); // This is a function that allows us to navigate to a different page.
    const {id} = useParams(); // This is the id of the user whose profile we want to edit.
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        username: '',
        bio: '',
        avatar: null // The initial state of the avatar (user's profile picture) is null because we are going to upload an image there later.
    });

    /*
    This function fetches the user's information from the server.
    "useCallback" is used when we want memoize a function. This means that the function will be stored in memory and will not be recreated every time the component re-renders."
     */
    const fetchUser = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`);
            const data = await response.json();
            setFormData(data);
            console.log("Users are fetched:", data);
        } catch (error) {
            console.error('Error:', error);
        }
    }, [id]);
    // Here, dependency array caches setFormData to avoid re-creating the function every time the component re-renders.

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        // This is a simple function that updates old state with new state.
        setFormData({...formData, [name]: name === 'avatar' ? files[0] : value });

    };

    async function handleSubmit(e) {
        e.preventDefault();

        const formDataToSend = new FormData(); // This is a form data object that will be used to send the user's information to the server.
        formDataToSend.append('name', formData.name);
        formDataToSend.append('surname', formData.surname);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('username', formData.username);
        formDataToSend.append('bio', formData.bio);
        formDataToSend.append('avatar', formData.avatar);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
                method: 'PATCH',
                credentials: 'include',
                body: formDataToSend,
            });

            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            console.log('User updated:', data);

            navigate(`/clients/${id}`); // redirect user back to his profile page

        } catch (error) {
            console.error('Error:', error);
        }
    }


    return (
        <div className="max-w-xl mx-auto mt-8 px-4 py-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <h1 className="text-2xl font-bold text-gray-800 bg-gray-200 px-4 py-2">
                    Edit User
                </h1>
                <form onSubmit={handleSubmit} className="px-8 py-6">
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="surname"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Surname:
                        </label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="bio"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Bio:
                        </label>
                        <input
                            type="text"
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="avatar" className="block text-gray-700 text-sm font-bold mb-2">
                            Avatar:
                        </label>
                        <label className="w-full flex items-center justify-center px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-100">
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            {
                                // This part is for the image upload field. If the user has already uploaded an image, it will be displayed here.
                            }
                            {formData.avatar ? (
                                <span className="truncate">{formData.avatar.name}</span>
                            ) : (
                                <span>Choose File</span>
                            )}
                            <input type="file" name="avatar" className="hidden" onChange={handleChange} accept="image/*" />
                        </label>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}