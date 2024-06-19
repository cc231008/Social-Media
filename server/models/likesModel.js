const {config: db} = require("../services/database");


//Works
let getLikes = (postId) => new Promise((resolve, reject) => {
    db.query(`SELECT COUNT(*) as likeCount FROM likes WHERE postId = ?`, [postId], function (err, likes, fields) {
        if (err) {
            reject(err)
        } else {
            resolve(likes[0]);
        }})
})

// Does not work
let addLike = (likeData) => new Promise((resolve, reject) => {
    //check if data is provided
    if (!likeData.userId || !likeData.postId) {
        return reject('User ID and Post ID are required')
    }

    //if like already exists, you cannot like again
    db.query(`SELECT * FROM likes WHERE userId = ? AND postId = ?`, [likeData.userId, likeData.postId], function (err, likes, fields) {
        if (err) {
            reject(err)
        }
        if (likes.length > 0) {
            return reject('You already liked this post')
        }
    })

    // add the like
    db.query(`INSERT INTO likes (userId, postId) VALUES (?, ?)`, [likeData.userId, likeData.postId], function (err, result) {
        if (err) {
            reject(err)
        } else {
            resolve(result);
        }})

    // like counter
    db.query(`SELECT COUNT(*) as likeCount FROM likes WHERE postId = ?`, [likeData.postId], function (err, likes, fields) {
        if (err) {
            reject(err)
        } else {
            resolve(likes[0]);
        }})
})
function deleteLike(likeData) {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM likes WHERE userId = ? AND postId = ?`, [likeData.userId, likeData.postId], function (err, result) {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }})
        db.query(`SELECT COUNT(*) as likeCount FROM likes WHERE postId = ?`, [likeData.postId], function (err, likes, fields) {
            if (err) {
                reject(err)
            } else {
                resolve(likes[0]);
            }})
    })

}

module.exports = {
    addLike,
    getLikes,
    deleteLike
}