const postsModel = require('../models/postsModel');

function getPosts(req, res, next){
    postsModel.getPosts()
        .then(posts => res.json(posts))
        .catch(err => res.sendStatus(500)
    )
}

function getPost(req, res, next){
    postsModel.getPost(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.sendStatus(500)
    )
}

function addPost(req, res, next){
    const {userId, imgPost, description, namePost} = req.body;
    postsModel.addPost({userId, imgPost, description, namePost})
        .then(result => res.json(result))
        .catch(err => res.sendStatus(500)
    )
}

function editPost(req, res, next){
    const id = req.params.id;
    const {userId, description, namePost} = req.body;
    postsModel.editPost({id, userId, description, namePost})
        .then(result => res.json(result))
        .catch(err => res.sendStatus(500)
    )
}

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