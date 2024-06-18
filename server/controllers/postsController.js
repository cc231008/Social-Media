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

module.exports = {
    getPosts,
    getPost
};