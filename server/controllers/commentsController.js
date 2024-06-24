const commentsModel = require("../models/commentsModel");

// This function fetches all comments from the database and sends them as a response.
function getCommentsByPost(req, res, next) {
    const postId = req.params.postId; // Get the postId to say which post we want to get comments for.

    if (!postId) {
        return res.status(400).json({ error: 'Missing required field: postId' });
    }

    commentsModel.getCommentsByPost(postId)
        .then(comments => res.json(comments))
        .catch(err => res.status(500).json({ error: err }));
}

// This function adds a comment to the database and sends a response.
function addComments(req, res, next) {
    const { postId, userId, text } = req.body;
    if (!postId || !userId || !text) {
        return res.status(400).json({error: 'Missing required fields: postId, userId, text'});
    }
        commentsModel.addComments({ postId, userId, text })
            .then(comment => res.json(comment))
            .catch(err => res.status(500).json({ error: err.message }));
    }

    // This function deletes a comment from the database and sends a response.
    function deleteComment (req, res, next) {
    const { commentId } = req.params;
        commentsModel.deleteComment(commentId)
            .then(result => res.json(result))
            .catch(err => res.status(500).json({ error: err }));
    }

    // This function edits a comment in the database and sends a response.
    function updateComment (req, res, next) {
    const { id, text } = req.body;
        commentsModel.updateComment({ id, text })
            .then(result => res.json(result))
            .catch(err => res.status(500).json({ error: err }));
    }

module.exports = {
    getCommentsByPost,
    addComments,
    deleteComment,
    updateComment
}