import {useCallback, useEffect, useState} from "react";
import Comments from "../components/Comments";
import Likes from "../components/Likes";
import {Link} from "react-router-dom";
import {useAuth} from "../components/AuthContext";

export default function Home() {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);

    let fetchPosts = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:2999/posts/');
            const data = await response.json();
            console.log(data);
            setPosts(data);
        }
        catch (error) {
            console.log(error);
        }
    }, [setPosts])

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
                                src={post.avatar}
                                alt="Avatar"
                                className="w-10 h-10 rounded-full object-cover mr-2"
                            />
                            <h3 className="text-lg font-semibold">{post.username}</h3>
                        </div>
                        {post.imgPost.map((imgUrl, index) => (
                            <img
                                key={index}
                                src={imgUrl}
                                alt={`Post ${index}`}
                                className="w-full object-cover mb-4"
                            />
                        ))}
                        <p className="text-gray-700">{post.description}</p>
                    </div>
                    <div className="p-4 border-t border-gray-200">
                        {user && user.id === post.userId && (
                            <Link
                                to={`/posts/${post.id}`}
                                className="text-blue-500 hover:text-blue-600 mr-4"
                            >
                                Edit
                            </Link>
                        )}
                        <Likes postId={post.id} />
                        <Comments postId={post.id} />
                    </div>
                </div>
            ))}
        </div>
    );
}