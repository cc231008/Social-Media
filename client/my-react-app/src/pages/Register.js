import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../components/AuthContext";

// This is the page where the user can register a new account. He needs fill in the form with his information.
export default function Register() {
    // This is a list of variables that are used to store the user's information to be sent to the server and create a new user.
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [password, setPassword] = useState('');

    const navigate = useNavigate(); // This is a function that allows us to navigate to a different page.
    const { setUser } = useAuth(); // This is a function that allows us to set the user's information in the context.

    async function handleRegister(e) {
        e.preventDefault();
        try {
            const formData = new FormData(); // This is a form data object that will be used to send the user's information to the server.

            // This part of the code appends the user's information to the form data object (or to formData).
            formData.append('name', name);
            formData.append('surname', surname);
            formData.append('email', email);
            formData.append('username', username);
            formData.append('bio', bio);
            formData.append('avatar', avatar);
            formData.append('password', password);

        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
            method: 'POST', // This is a POST request to register a new user.
            credentials: 'include', // This includes the user's credentials and cookies in the request.
            body: formData // body sends the form data object to the server.
        });

        const data = await response.json(); // "data" contains information about the user that was registered.
        setUser(data); // "setUser" adds the user's information to the context in order to notify the application that the user is logged in.


        if (response.ok) {
            navigate(`/clients/${data.id}`);
        }
        else {
            console.error("Error", data);
        }
    }
    catch (error) {
        console.error("Error", error);
    }
    }

    // The purpose of this function is to store the selected file in the state.
    function handleAvatarChange(e) {
        setAvatar(e.target.files[0]); // Store the file object
    }

    return (
        <div className="max-w-md mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
            <form onSubmit={handleRegister} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name:
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        placeholder="Enter your name"
                    />
                </div>
                <div>
                    <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
                        Surname:
                    </label>
                    <input
                        id="surname"
                        type="text"
                        name="surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        placeholder="Enter your surname"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email:
                    </label>
                    <input
                        id="email"
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username:
                    </label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        placeholder="Choose a username"
                    />
                </div>
                <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                        Bio:
                    </label>
                    <input
                        id="bio"
                        type="text"
                        name="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        placeholder="Tell us about yourself"
                    />
                </div>
                <div>
                    <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                        Avatar:
                    </label>
                    <label className="w-full flex items-center justify-center px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-100">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    {avatar ? (
                        <span className="truncate">{avatar.name}</span>
                    ) : (
                        <span>Choose File</span>
                    )}
                    <input
                        id="avatar"
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={handleAvatarChange} // Store selected file in state
                        className="hidden"
                    />
                    </label>

                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password:
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        placeholder="Enter your password"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 transition duration-300 ease-in-out"
                >
                    Register
                </button>
            </form>
        </div>
    );
}