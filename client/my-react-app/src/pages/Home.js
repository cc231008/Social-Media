import {useCallback, useEffect, useState} from "react";
import Comments from "../components/Comments";
import Likes from "../components/Likes";
import {Link} from "react-router-dom";
import {useAuth} from "../components/AuthContext";
import {Buffer} from "buffer";

// This is the page where the user can see all the posts that were uploaded by all the users.
export default function Home() {
    const { user } = useAuth(); // This is the logged in user.

    const [posts, setPosts] = useState([]); // This is the list of posts that will be displayed on the page.

    /*
    This function fetches all the posts from the server.
    "useCallback" is used when we want memoize a function. This means that the function will be stored in memory and will not be recreated every time the component re-renders."
     */
    let fetchPosts = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`);
            const data = await response.json();
            setPosts(data);
        }
        catch (error) {
            console.error(error);
        }
    }, [setPosts])
    // Here, dependency array caches setPosts to avoid re-creating the function every time the component re-renders.

    useEffect(() => {
        fetchPosts();
    },[fetchPosts]);


    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Home</h1>
            <Link
                to="/uploads"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg inline-block mb-4"
            >
                Add new post
            </Link>
            {posts.map((post) => (
                <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
                    <div className="p-4">
                        <div className="flex items-center mb-4">
                            <img
                                src={`data:image/jpeg;base64,${Buffer.from(post.avatar).toString('base64')}`}
                                alt="Avatar"
                                className="w-10 h-10 rounded-full object-cover mr-2"
                            />
                            <h3 className="text-lg font-semibold">{post.username}</h3>
                        </div>

                            <img
                                key={post.id}
                                src={`data:image/jpeg;base64,${Buffer.from(post.imgPost).toString('base64')}`}
                                alt={`Post ${post.id}`}
                                className="w-full object-cover mb-4"
                            />

                        <p className="text-gray-700">{post.description}</p>
                    </div>
                    <div className="p-4 border-t border-gray-200">

                        {user && user.id === post.userId && (
                            /*
                            This part of the code checks if the logged in user is the owner of the post.
                            This Link redirects the user to the edit page if the user is the owner of the post.
                             */
                            <Link
                                to={`/posts/${post.id}`}
                                className="text-blue-500 hover:text-blue-600 mr-4"
                            >
                                Edit
                            </Link>
                        )}

                        {
                            /*
                            Go to the "components" folder and find these components to see how they work!
                             */
                        }
                        <Likes postId={post.id} />
                        <Comments postId={post.id} />

                    </div>
                </div>
            ))}
        </div>
    );
}