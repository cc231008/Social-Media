const {config: db} = require("../services/database");
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;


// In this function, we are checking if the user exists in the database and if the password is correct.
// If the user exists and the password is correct, we are creating a JWT token and returning the user and the token.
let loginUser = (userData) => new Promise(async (resolve, reject) => {
    try {
        //check if data is provided
        if (!userData.email || !userData.password) {
            return reject('Email and password are required')
        }

        let sql = 'SELECT * FROM client WHERE email = ?';
        db.query(sql, [userData.email], function (err, clients, fields){
            if(err) {
                console.error('Database query error:', err);
                return reject(err)
            }
            if (clients.length === 0) {
                return reject('User not found')
            }

            let client = clients[0]; //get first client from database

            //if no password abort
            if (!client.password) {
                return reject('Invalid password')
            }

            //compare password that user entered with the one in the database.
            bcrypt.compare(userData.password, client.password, function(err, isMatch) {
                if (err) {
                    console.error('Bcrypt comparison error:', err);
                    return reject(err)
                }
                if (isMatch) {
                    try {
                        //create a jwt
                        const accessToken = jwt.sign({id: client.id, name: client.name, email: client.email}, accessTokenSecret);

                        // Return the client and token
                        return resolve({client: client, token: accessToken});

                    } catch (error) {
                        console.error('JWT error:', error)
                        return reject(error)
                    }
                } else {
                    reject('Invalid password')
                }
            });
        })
    } catch (error) {
        console.error('Login error:', error)
        return reject(error)
    }
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