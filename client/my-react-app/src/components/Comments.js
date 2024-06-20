import {useCallback, useEffect, useState} from "react";
import {useAuth} from "./AuthContext";
export default function Comments({ postId }) {
    const { user } = useAuth();
    const [comments, setComments] = useState([]); // useState that allows us to store the comments and display them on the page.
    const [newComment, setNewComment] = useState(''); // useState that allows us to store the new comment that the user is typing.
    const [editCommentId, setEditCommentId] = useState(null); // useState that allows us to store the id of the comment that the user wants to edit.
    const [editCommentText, setEditCommentText] = useState('');

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



    // Function for Adding Comments
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
            body: JSON.stringify({ text: newComment, postId, userId: user.id }),
        });
            const data = await response.json();
            console.log('Added Comment:', data);

            setComments((prevComments) => [...prevComments, data]); // Takes the old list of comments and adds the new comment to it.

            setNewComment(''); // Clears the input field after the comment is added.
    }
        catch (error) {
        console.error('Error adding comment:', error);
    }
}

// Function for Deleting Comments
const handleDelete = async (commentId) => {
    try {
        const response = await fetch(`http://localhost:2999/comments/delete/${commentId}`, {
            method: 'DELETE',
            credentials: 'include',
            body: JSON.stringify({ commentId }),
        });
        const data = await response.json();
        console.log('Deleted Comment:', data);
        setComments(comments.filter((comment) => comment.id !== commentId));
    }
    catch (error) {
        console.error('Error deleting comment:', error);
    }
}

// Function for Updating Comments
const handleUpdate = async (commentId) => {
    try {
        const response = await fetch(`http://localhost:2999/comments/update/${commentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ id: editCommentId, text: editCommentText }),
        });
        const updatedComment = await response.json();
        setComments((prevComments) =>
            prevComments.map((comment) => (comment.id === editCommentId ? updatedComment : comment))
        );
        setEditCommentId(null); // Exit edit mode
        setEditCommentText('')
    }
    catch (error) {
        console.error('Error updating comment:', error);
    }
}
// It maps through each comment
    const renderComments = () => {

        return comments.map((comment) => (

            <div key={comment.id} className="comment">
                <div className="comment-header">
                    <h4>{comment.username}</h4>
                    {user && user.id === comment.userId && (
                        <div className="comment-actions">
                            {editCommentId !== comment.id ? (
                                <button onClick={() => {
                                    setEditCommentId(comment.id);
                                    setEditCommentText(comment.text);
                                }}>Edit</button>
                            ) : (
                                <button onClick={() => handleUpdate(comment.id)}>Save</button>
                            )}
                            <button onClick={() => handleDelete(comment.id)}>Delete</button>
                        </div>
                    )}
                </div>
                <div className="comment-content">
                    {editCommentId !== comment.id ? (
                        <p>{comment.text}</p>
                    ) : (
                        <textarea
                            value={editCommentText}
                            onChange={(e) => setEditCommentText(e.target.value)}
                            placeholder="Edit your comment..."
                            rows={3}
                        />
                    )}
                </div>
            </div>
        ));
    };

    return (
        <div className="comments-container">
            <h1>Comments</h1>
            <div className="comments-list">
                {comments.length > 0 ? renderComments() : <p>No comments yet.</p>
                //This message appears if there are no comments in the page.
                }
            </div>
            {user ? (
                <form onSubmit={handleSubmit} className="comment-form">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        rows={3}
                    />
                    <button type="submit">Add Comment</button>
                </form>
            ) : (
                <p className="login-message">You must be logged in to comment.</p>
            )}
        </div>
    );
}