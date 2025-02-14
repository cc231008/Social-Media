import {useCallback, useEffect, useState} from "react";
import {useAuth} from "./AuthContext";

// This is the component that displays the comments that users have written on a post and allows users to add, edit, or delete comments.
// You can find this component in the Home page where all the posts are displayed.

/*
Here is the general explanation how everything works:
1. The user writes a comment in the input field, then presses the "Add Comment" button to add the comment.
2. The written comment is sent to the server, then server adds the comment to the database.
If everything is successful, the server sends the comment back to the client.
3. frontend receives the comment from the server and adds it to the list of comments which is done in the "handleSubmit" function.
4. The user can edit or delete the comment. If the user is logged in and the comment belongs to the user, the user can edit or delete the comment.
5. If the user wants to edit the comment, the user presses the "Edit" button, then the comment is displayed as a textarea.
The user can edit the comment and press the "Save" button to save the changes.
 */
export default function Comments({ postId }) {
    const { user } = useAuth();

    const [comments, setComments] = useState([]); // useState that allows us to store the comments and DISPLAY them on the page.
    const [newComment, setNewComment] = useState(''); // useState that allows us to store the new comment that the user is TYPING.
    const [editCommentId, setEditCommentId] = useState(null); // useState that allows us to store the id of the comment that the user wants to edit.
    const [editCommentText, setEditCommentText] = useState(''); // useState that allows us to store the text of the comment that the user wants to edit.

    // useCallback MEMORIZES ALL THE COMMENTS that are fetched from the server and does not fetch them again.
    // This function fetches all the comments that belong to a specific post.
    const fetchComments = useCallback(async () => {

        try {

            const response = await fetch(`http://localhost:2999/comments/${postId}`, {
                credentials: 'include', // Adds cookies to the request.
            });

            const data = await response.json();
            setComments(data);
        }
        catch (error) {
            console.error('Fetch Comments Error:', error);
        }
    }, [postId]);


    useEffect(() => {
        comments && fetchComments();
    } , [comments, fetchComments]);

    // Function for Adding Comments
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert('You must be logged in to comment.');
            return;
        }

        try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/comments/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ text: newComment, postId, userId: user.id }),
        });
            const data = await response.json();
            // Add the new comment to the existing list of comments.
            setComments(data);

            // Clears the input field after the comment is added in order to allow the user to write a new comment from scratch.
            setNewComment('');
    }
        catch (error) {
        console.error('Error adding comment:', error);
    }
}


// Function for Deleting Comments
const handleDelete = async (commentId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/comments/delete/${commentId}`, {
            method: 'DELETE',
            credentials: 'include',
            body: JSON.stringify({ commentId }),
        });
       if (response.ok) {
           setComments(comments.filter((comment) => comment.id !== commentId));
       }
    }
    catch (error) {
        console.error('Error deleting comment:', error);
    }
}

// Function for Updating Comments
const handleUpdate = async () => {
        if (!editCommentId) return;

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/comments/update/${editCommentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ id: editCommentId, text: editCommentText }), // Sends the updated comment text to the server.
        });

        const data = await response.json();

        // Takes the old list of comments and EDITS the existing comment to it.
        setComments(data);

        // RESETS the edit comment id and text after the comment is updated.
        setEditCommentId(null);
        setEditCommentText('')
    }
    catch (error) {
        console.error('Error updating comment:', error);
    }
}

    // This is a function that renders the comments as a list of comments.
    // It also allows the user to EDIT or DELETE the comments, provided that the user is logged in!!!
    const renderComments = () => {

        return comments.map(comment => (

            <div key={comment.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">{comment.username}</h4>
                    {
                        // If the user is logged in and a comment belongs to the user, the user can EDIT or DELETE the comment.
                    }
                    {user && user.id === comment.userId && (
                        <div className="flex space-x-2">
                            {
                                // If the user IS NOT EDITING the comment, the user can press the button to EDIT the comment.
                            }
                            {editCommentId !== comment.id ? (
                                <button
                                    onClick={() => {
                                        setEditCommentId(comment.id); // Choose the comment to edit.
                                        setEditCommentText(comment.text); // Set the text of the comment to edit.
                                    }}
                                    className="text-blue-500 hover:text-blue-600">
                                    Edit
                                </button>
                            ) : (

                                // If the user IS EDITING the comment, the user can press the button to SAVE the comment.
                                <button
                                    onClick={handleUpdate}
                                    className="text-blue-500 hover:text-blue-600"
                                >
                                    Save
                                </button>
                            )}
                            <button
                                onClick={() => handleDelete(comment.id)}
                                className="text-red-500 hover:text-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
                <div className="mb-2">
                    {
                        // If the user is NOT EDITING the comment, the comment is displayed as text.
                    }
                    {editCommentId !== comment.id ? (
                        <p>{comment.text}</p>
                    ) : (
                        <textarea
                            value={editCommentText}
                            onChange={(e) => setEditCommentText(e.target.value)}
                            className="border rounded-lg p-2 w-full"
                            rows={3}
                        />
                    )}
                </div>
            </div>
        ));
    };

    return (
        <div className="max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-4">Comments</h2>
            <div className="space-y-4">

                {
                    // If there are comments, render them as a list of comments.
                }
                {comments.length > 0 ? renderComments() : <p>No comments yet.</p>}
            </div>

            {
                // A comment section that allows users to WRITE A COMMENT and ADD IT to the list of comments, if they are logged in.
            }
            {user ? (
                <form onSubmit={handleSubmit} className="mt-4">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="border rounded-lg p-2 w-full"
                        placeholder="Write a comment..."
                        rows={3}
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-2"
                    >
                        Add Comment
                    </button>
                </form>
            ) : (
                <p className="mt-4 text-gray-600">You must be logged in to comment.</p>
            )}


        </div>
    );
}