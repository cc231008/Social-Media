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
    db.query(`INSERT INTO posts (userId, imgPost, description) VALUES (${post.userId}, '${post.imgPost}', '${post.description}')`, function (err, result) {
        if (err) {
            reject(err)
        } else {
            resolve(result);
        }}
    )
    })

module.exports = {
    getPosts,
    getPost,
}