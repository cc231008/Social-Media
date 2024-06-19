import {useCallback, useEffect, useState} from "react";
import {useAuth} from "./AuthContext";
export default function Comments({ postId }) {
    const { user } = useAuth();
    const [comments, setComments] = useState([]); // useState that allows us to store the comments and display them on the page.
    const [newComment, setNewComment] = useState(''); // useState that allows us to store the new comment that the user is typing.
    const [editCommentId, setEditCommentId] = useState(null);
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
            setComments([...comments, data]);
            setNewComment('');
    }
        catch (error) {
        console.error('Error adding comment:', error);
    }
}

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

const handleUpdate = async (commentId) => {
    try {
        const response = await fetch(`http://localhost:2999/comments/update/${commentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ id: commentId, text: editCommentText }),
        });
        const updatedComment = await response.json();
        setComments(comments.map((comment) => (comment.id === commentId ? updatedComment : comment)));
        setEditCommentId(null); // Exit edit mode
        setEditCommentText('')
    }
    catch (error) {
        console.error('Error updating comment:', error);
    }
}

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
                {comments.length > 0 ? renderComments() : <p>No comments yet.</p>}
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