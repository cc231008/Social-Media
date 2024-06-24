// This is the font awesome icon component. This has nothing to do with the functionality. It is just a visual representation of the like button.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

import {useEffect, useState} from "react";
import {useAuth} from "./AuthContext";

// This is the component that displays the number of likes that a post has and allows the user to like or unlike the post.
export default function Likes({ postId }) {
    const { user } = useAuth(); // This is the logged in user.
    const [likes, setLikes] = useState(0); // This is the number of likes that the post has.
    const [liked, setLiked] = useState(false) // This is a boolean that indicates if the user has liked the post or not.

    // Basically, by the id of the post, we can fetch the number of likes that all posts have.
    const fetchLikes = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}/like`, {
                credentials: 'include',
            });
            const data = await response.json();
            setLikes(data.likeCount); // This sets the number of likes that the post has.
        }
        catch (error) {
            console.error('Fetch Likes Error:', error);
        }
    };

    useEffect(() => {
        fetchLikes();
    });

    // This function allows the user to like or unlike the post.
    const handleLike = async () => {
        if (!user) {
            alert('You must be logged in to like posts.');
            return;
        }

        /*
        If liked is true which means the user has already liked the post, then we can remove the like.
        On contrary, if liked is false, then we can add the like.
         */
        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}/${liked ? 'remove' : "add"}/like`, {
            method: 'POST', // This is a POST request to add or remove the like.
            headers: {
                'Content-Type': 'application/json', // This is the type of data that is being sent to the server.
            },
            credentials: 'include', // This includes the user's credentials and cookies in the request.
            body: JSON.stringify({ userId: user.id, postId}), // This is the data that is being sent to the server.
        });
        const data = await response.json();
        console.log('Added Like:', data);
        setLikes(data.likeCount); // This sets the number of likes that the post has.
        setLiked(!liked); // This toggles the liked state between true and false.
    }



    return (
        <div className="flex items-center">
            {
                // If the user is not logged in, then the user will not be able to like the post.
            }
            {user && (
                <button
                    onClick={handleLike}
                    className={`flex items-center text-gray-500 hover:text-blue-500 focus:outline-none`}
                >
                    <FontAwesomeIcon
                        icon={liked ? solidHeart : regularHeart}
                        className={`text-lg mr-1 ${liked ? 'text-red-500' : ''}`}
                    />
                    {
                        // If the user has liked the post, then the button will display "Unlike", otherwise it will display "Like" text.
                    }
                    {liked ? 'Unlike' : 'Like'} ({likes})
                </button>
            )}
        </div>
    );
}