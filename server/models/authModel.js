const {config: db} = require("../services/database");
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

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




let loginUser = (userData) => new Promise(async (resolve, reject) => {
    try {

        //check if data is provided
        if (!userData.email || !userData.password) {
            return reject('Email and password are required')
        }

        let sql = 'SELECT * FROM client WHERE email = ?';
        db.query(sql, [userData.email], function (err, result, fields){
            if(err) {
                console.error('Database query error:', err);
                return reject(err)
            }
            if (result.length === 0) {
                return reject('User not found')
            }

            const user = result[0];

            //if no password abort
            if (!user.password) {
                return reject('Invalid password')
            }

            //compare password
            bcrypt.compare(userData.password, user.password, function(err, isMatch) {
                if (err) {
                    console.error('Bcrypt comparison error:', err);
                    return reject(err)
                }
                if (isMatch) {
                    try {
                        //send a jwt
                        const accessToken = jwt.sign({
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }, process.env.ACCESS_TOKEN_SECRET);
                        return resolve({user, token: accessToken});
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

module.exports = {
    registerUser,
    loginUser
};