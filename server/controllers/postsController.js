const postsModel = require('../models/postsModel');

function getPosts(req, res, next){
    postsModel.getPosts()
        .then(posts => res.json(posts))
        .catch(err => res.sendStatus(500)
    )
}

module.exports = {
    getPosts
};