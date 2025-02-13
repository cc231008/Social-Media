const postsModel = require('../models/postsModel');

// This function fetches all posts from the database and sends them as a response.
function getPosts(req, res, next){
    postsModel.getPosts()
        .then(posts => res.json(posts))
        .catch(err => res.sendStatus(500)
    )
}

// This function fetches a single post from the database and sends it as a response.
function getPost(req, res, next){
    postsModel.getPost(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.sendStatus(500)
    )
}

function addPost(req, res, next) {
    const { userId, description, namePost } = req.body;
    const imgPost = req.file.buffer; // Access the uploaded file's buffer

    postsModel.addPost({ userId, imgPost, description, namePost })
        .then(post => res.json(post))
        .catch(err => {
            res.status(500);
            next(err);
        });
}

// This function edits a post in the database and sends a response.
function editPost(req, res, next){
    const id = req.params.id;
    const {userId, description, namePost} = req.body;
    postsModel.editPost({id, userId, description, namePost})
        .then(result => res.json(result))
        .catch(err => res.sendStatus(500)
    )
}

// This function deletes a post from the database and sends a response.
function deletePost(req, res, next){
    postsModel.deletePost(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.sendStatus(500)
    )
}

module.exports = {
    getPosts,
    getPost,
    addPost,
    editPost,
    deletePost
};