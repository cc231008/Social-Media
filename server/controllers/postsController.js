const postsModel = require('../models/postsModel');
const upload = require('../services/multerConfig');

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

// This function adds a post to the database and sends a response.
function addPost(req, res, next) {
    // The upload.array('imgPost', 12) middleware is used to upload multiple files with the name imgPost.
    // The second parameter is the maximum number of files that can be uploaded.
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
            const imgPostFilenames = imgPosts.map(file => file.filename); // Get the filenames of the uploaded images.

            const result = await postsModel.addPost({ userId, imgPost: imgPostFilenames, description, namePost });
            // Create an array of objects with the URL and filename of the uploaded images.
            // It looks like this: [{ url: 'http://localhost:2999/uploads/filename1.jpg', filename: 'filename1.jpg' }]
            const imgUrls = imgPostFilenames.map(filename => ({
                url: `${process.env.SERVER_HOST}/uploads/${filename}`,
                filename
            }));

            // Send the response with the result and the array of image URLs in concert.
            res.json({ ...result, imgUrls });
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
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