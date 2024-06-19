const {config: db} = require("../services/database");

let getCommentsByPost = (postId) => new Promise((resolve, reject) => {
    let sql = `SELECT comments.*, client.username FROM comments INNER JOIN client ON comments.userId = client.id WHERE comments.postId = ${db.escape(postId)}`;
    db.query(sql, (err, results) => {
        if (err) {
            reject(err);
        } else {
            resolve(results);
        }
    });
});

let addComments = (comments) => new Promise(async (resolve, reject) => {
    const { postId, userId, text } = comments;
    let sql = `INSERT INTO comments (postId, userId, text) VALUES (?, ?, ?)`;
    db.query(sql, [postId, userId, text], function (err, result, fields) {
        if (err) {
            reject(err);
        }
        const comment = { id: result.insertId, postId, userId, text };
        resolve(comment);
    });
});

let deleteComment = (commentId) => new Promise((resolve, reject) => {
    let sql = `DELETE FROM comments WHERE id = ?`;
    db.query(sql, [commentId], (err, result) => {
        if (err) {
            reject(err);
        } else {
            resolve(result);
        }
    });
});

let updateComment = (comment) => new Promise((resolve, reject) => {
    let sql = `UPDATE comments SET text = ? WHERE id = ?`;
    db.query(sql, [comment.text, comment.id], (err, result) => {
        if (err) {
            reject(err);
        } else {
            resolve(result);
        }
    });
})



module.exports = {
    getCommentsByPost,
    addComments,
    deleteComment,
    updateComment
}