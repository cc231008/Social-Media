const {config: db} = require("../services/database");
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');


// In this function, we are checking if the user exists in the database and if the password is correct.
// If the user exists and the password is correct, we are creating a JWT token and returning the user and the token.
let loginUser = (email) => new Promise(async (resolve, reject) => {
        let sql = 'SELECT * FROM client WHERE email = ?';
        db.query(sql, [email], function (err, clients) {
            if(err) {
                console.error('Database query error:', err);
                return reject(err)
            }
            if(clients.length === 0) {
                return reject('User not found')
            }
            console.log('Clients:', clients[0]);
            resolve(clients[0])
})
})

// In this function, we are checking if the user exists in the database.
// If the user exists, we are hashing the password and adding the new user into the database.
let registerUser = (userData) => new Promise(async (resolve, reject) => {
    try {
        //check if user exists
        let checkUser = `SELECT * FROM client WHERE email = ${db.escape(userData.email)}`;
        db.query(checkUser, function (err, result, fields){
            if(err) {
                reject(err)
            }
            if (result.length > 0) {
                reject('User already exists')
            }
        })

        //hash password
         let hashedPassword = await bcrypt.hash(userData.password, 10);

        //add new user into database
        let sql = `INSERT INTO client (name, surname, username, email, bio, avatar, password) VALUES (` +
            db.escape(userData.name) + `, ` +
            db.escape(userData.surname) + `, ` +
            db.escape(userData.username) + `, ` +
            db.escape(userData.email) + `, ` +
            db.escape(userData.bio) + `, ` +
            db.escape(userData.avatar) + `, ` +
            db.escape(hashedPassword) + `)`;
        db.query(sql, function (err, result, fields){
            if(err) {
                reject(err)
            }
            console.log(result.affectedRows + " rows have been affected")
            userData.id = result.insertId;
            resolve(userData)
        })
    } catch (error) {
        reject(error)
    }
})


module.exports = {
    loginUser,
    registerUser,
};
