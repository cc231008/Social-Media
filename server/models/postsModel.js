const {config: db} = require("../services/database");

// In this SQL query, we are selecting all columns from the posts table and joining the client table to get the username and avatar of the user who created the post.
let getPosts = () => new Promise((resolve, reject) => {
    db.query(`SELECT posts.*, client.username, client.avatar FROM posts JOIN client ON posts.userId = client.id`, function (err, posts, fields) {
        if (err) {
            reject(err)
        } else {
            resolve(posts);
        }})})

// In this SQL query, we are selecting all columns from the posts table where the id is equal to the id that is passed as a parameter.
let getPost = (id) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM posts WHERE id = ${id}`, function (err, post, fields) {
        if (err) {
            reject(err)
        } else {
            resolve(post);
        }}
    )})

// In this SQL query, we are inserting a new post into the posts table.
let addPost = (post) => new Promise((resolve, reject) => {
    const { userId, imgPost, description, namePost } = post;
    db.query(`INSERT INTO posts (userId, imgPost, description, namePost) VALUES (?, ?, ?, ?)`, [userId, imgPost, description, namePost], function (err, result) {
        if (err) {
            reject(err);
        } else {
            const newPost = { id: result.insertId, userId, imgPost, description, namePost };
            resolve(newPost);
        }
    });
});


// In this SQL query, we are updating the posts table where the id is equal to the id that is passed as a parameter.
let editPost = (post) => new Promise((resolve, reject) => {

    const {id, userId, description, namePost} = post;

    const sql = `UPDATE posts SET userId = ?, description = ?, namePost = ? WHERE id = ?`;

    db.query(sql, [userId, description, namePost, id], function (err, result) {
        if (err) {
            console.error("Error editing post", err);
            reject(err)
        } else {
            resolve(result);
        }
    })})

let deletePost = (id) => new Promise((resolve, reject) => {

    db.query(`SELECT imgPost FROM posts WHERE id = ${id}`, function (err, results) {

        if (err) {
            reject(err);
        } else if (results.length === 0) {
            reject(new Error('Post not found'));
        }

        else {
            db.query(`DELETE FROM posts WHERE id = ${id}`, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        }
    });
});


module.exports = {
    getPosts,
    getPost,
    addPost,
    editPost,
    deletePost
}