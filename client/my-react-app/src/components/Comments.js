import {useCallback, useEffect, useState} from "react";
import {useAuth} from "./AuthContext";
export default function Comments({ postId }) {
    const { user } = useAuth();
    const [comments, setComments] = useState([]); // useState that allows us to store the comments and display them on the page.
    const [text, setText] = useState(''); // useState that allows us to store the text of the comment that the user is typing.

    // useCallback memorizes all the comments that are fetched from the server and does not fetch them again.
    const fetchComments = useCallback(async () => {

        try {

            const response = await fetch(`http://localhost:2999/comments/${postId}`, {
                credentials: 'include', // It's important for cookies to identify the user.
            });

            const data = await response.json();
            setComments(data);
        }
        catch (error) {
            console.error('Fetch Comments Error:', error);
        }
    }, [postId]);


    useEffect(() => {
        fetchComments();
    }, [fetchComments]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert('You must be logged in to comment.');
            return;
        }

        try {
        const response = await fetch('http://localhost:2999/comments/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ text, postId, userId: user.id }),
        });
            const data = await response.json();
            console.log('Added Comment:', data);
            setComments([...comments, data]);
            setText('');
    }
        catch (error) {
        console.error('Error adding comment:', error);
    }
}


    return (
        <div>
            <h1>Comments</h1>
            {comments.map((comment) => (
                <div key={comment.id}>
                    <h3>{comment.username}</h3>
                    <p>{comment.text}</p>
                </div>
            ))}
            {user ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        {user.name}
                    </label>
                    <label>
                        Comment:
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <p>You must be logged in to comment.</p>
            )}
      </div>
    );
}