const {config: db} = require("../services/database");

let getPosts = () => new Promise((resolve, reject) => {
    db.query(`SELECT posts.*, client.username, client.avatar FROM posts JOIN client ON posts.userId = client.id`, function (err, posts, fields) {
        if (err) {
            reject(err)
        } else {
            resolve(posts);
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
    const {userId, imgPost, description, namePost} = post;
    db.query(`INSERT INTO posts (userId, imgPost, description, namePost) VALUES (?, ?, ?, ?)`, [userId, imgPost, description, namePost], function (err, result) {
        if (err) {
            reject(err)
        } else {
            const post = {id: result.insertId, userId, imgPost, description, namePost};
            resolve(post);
        }}
    )
    })

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