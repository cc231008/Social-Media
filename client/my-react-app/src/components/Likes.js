import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import {useEffect, useState} from "react";
import {useAuth} from "./AuthContext";

export default function Likes({ postId }) {
    const { user } = useAuth();
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false)
    const fetchLikes = async () => {
        try {
            const response = await fetch(`http://localhost:2999/posts/${postId}/like`, {
                credentials: 'include',
            });
            const data = await response.json();
            setLikes(data.likeCount);
        }
        catch (error) {
            console.error('Fetch Likes Error:', error);
        }
    };

    useEffect(() => {
        fetchLikes();
    });

    const handleLike = async () => {
        if (!user) {
            alert('You must be logged in to like posts.');
            return;
        }
        const response = await fetch(`http://localhost:2999/posts/${postId}/${liked ? 'remove' : "add"}/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ userId: user.id, postId}),
        });
        const data = await response.json();
        console.log('Added Like:', data);
        setLikes(data.likeCount);
        setLiked(!liked);
    }



    return (
        <div className="flex items-center">
            {user && (
                <button
                    onClick={handleLike}
                    className={`flex items-center text-gray-500 hover:text-blue-500 focus:outline-none`}
                >
                    <FontAwesomeIcon
                        icon={liked ? solidHeart : regularHeart}
                        className={`text-lg mr-1 ${liked ? 'text-red-500' : ''}`}
                    />
                    {liked ? 'Unlike' : 'Like'} ({likes})
                </button>
            )}
        </div>
    );
}