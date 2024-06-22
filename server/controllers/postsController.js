const postsModel = require('../models/postsModel');
const upload = require('../services/multerConfig');

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

function addPost(req, res, next) {
    upload.array('imgPost', 12)(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }

        const { userId, description, namePost } = req.body;
        const imgPosts = req.files;

        if (!imgPosts || imgPosts.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        try {
            // Assuming you're storing filenames or some identifier in the database
            const imgPostFilenames = imgPosts.map(file => file.filename);

            const result = await postsModel.addPost({ userId, imgPost: imgPostFilenames, description, namePost });
            const imgUrls = imgPostFilenames.map(filename => ({
                url: `http://localhost:2999/uploads/${filename}`,
                filename
            }));
            console.log(req.files, req.body);
            res.json({ ...result, imgUrls });
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    });
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