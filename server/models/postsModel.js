const {config: db} = require("../services/database");

let getPosts = () => new Promise((resolve, reject) => {
    db.query(`SELECT posts.*, client.username FROM posts JOIN client ON posts.userId = client.id`, function (err, posts, fields) {
        if (err) {
            reject(err)
        } else {
            resolve(posts);
        }})})

module.exports = {
    getPosts
}