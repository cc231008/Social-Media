const {config: db} = require("../services/database");

let getPosts = () => new Promise((resolve, reject) => {
    db.query(`SELECT posts.*, client.username, client.avatar FROM posts JOIN client ON posts.userId = client.id`, function (err, posts, fields) {
        if (err) {
            reject(err)
        } else {
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    imgPost: JSON.parse(post.imgPost).map(filename => `http://localhost:2999/uploads/${filename}`)
                }
            })
            resolve(updatedPosts);
        }})})

let getPost = (id) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM posts WHERE id = ${id}`, function (err, post, fields) {
        if (err) {
            reject(err)
        } else {
            resolve(post);
        }}
    )})

let addPost = (post) => new Promise((resolve, reject) => {
    const { userId, imgPost, description, namePost } = post;
    const imgPostJson = JSON.stringify(imgPost); // Convert array to JSON string

    db.query(`INSERT INTO posts (userId, imgPost, description, namePost) VALUES (?, ?, ?, ?)`, [userId, imgPostJson, description, namePost], function (err, result) {
        if (err) {
            reject(err);
        } else {
            const newPost = { id: result.insertId, userId, imgPost, description, namePost };
            resolve(newPost);
        }
    });
});


let editPost = (post) => new Promise((resolve, reject) => {
    const {id, userId, description, namePost} = post;
    const sql = `UPDATE posts SET userId = ?, description = ?, namePost = ? WHERE id = ?`;
    db.query(sql, [userId, description, namePost, id], function (err, result) {
        if (err) {
            console.error("Error editing post", err);
            reject(err)
        } else {
            resolve(post);
        }
    })})

let deletePost = (id) => new Promise((resolve, reject) => {
    db.query(`DELETE FROM posts WHERE id = ${id}`, function (err, result) {
        if (err) {
            reject(err)
        } else {
            resolve(result);
        }
    })
})

module.exports = {
    getPosts,
    getPost,
    addPost,
    editPost,
    deletePost
}