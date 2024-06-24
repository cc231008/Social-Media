const {config: db} = require("../services/database");
const fs = require('fs');
const path = require('path');

// In this SQL query, we are selecting all columns from the posts table and joining the client table to get the username and avatar of the user who created the post.
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


// In this SQL query, we are updating the posts table where the id is equal to the id that is passed as a parameter.
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


// In this function, we are deleting a post from the posts table and deleting the images from the uploads folder when images are no longer needed.
// They are of no use when the post is deleted.
const uploadsDir = path.join(__dirname, '../uploads');

let deletePost = (id) => new Promise((resolve, reject) => {

    db.query(`SELECT imgPost FROM posts WHERE id = ${id}`, function (err, results) {

        if (err) {
            reject(err);
        } else if (results.length === 0) {
            reject(new Error('Post not found'));
        }

        else {
            // Parse JSON string to array because there can be multiple images.
            // For example, ["image1.jpg", "image2.jpg"]
            // But in general, there will be only one image which makes it quite useless to store it as an array, therefore it is not the best practice.
            // I realized that it is not the best practice after I have written the code.
            const imgPosts = JSON.parse(results[0].imgPost);

            db.query(`DELETE FROM posts WHERE id = ${id}`, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    imgPosts.forEach(filename => {

                        const filepath = path.join(uploadsDir, filename); // Create the file path in order to delete the file from the uploads folder.

                        console.log(`Deleting file: ${filepath}`); // Log the file path being deleted

                        fs.unlink(filepath, (err) => { // Delete the file with unlink function
                            if (err) {
                                console.error(`Failed to delete file: ${filepath}`, err);
                            } else {
                                console.log(`Successfully deleted file: ${filepath}`);
                            }
                        });
                    });
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