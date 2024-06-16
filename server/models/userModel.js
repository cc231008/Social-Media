const {config: db} = require("../services/database");
let getUsers = () => new Promise((resolve, reject) => {
    db.query("SELECT * FROM client", function (err, client, fields) {
        if (err) {
            reject(err)
        } else {
            resolve(client);
        }
    })
})

let getUser = (id) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM client WHERE id=${id}`, function (err, client, fields) {
        if (err) {
            reject(err)
        } else {
            resolve(client[0]);
        }
    })
})

let registerUser = (userData) => new Promise(async (resolve, reject) => {
    let sql = `INSERT INTO client (name, surname, username, email, bio, avatar, password) VALUES (` +
    db.escape(userData.name) + `, ` +
    db.escape(userData.surname) + `, ` +
    db.escape(userData.username) + `, ` +
    db.escape(userData.email) + `, ` +
    db.escape(userData.bio) + `, ` +
    db.escape(userData.avatar) + `, ` +
    db.escape(userData.password) + `)`;
    db.query(sql, function (err, result, fields){
        if(err) {
            reject(err)
        }
        console.log(result.affectedRows + " rows have been affected")
        userData.id = result.insertId;
        resolve(userData)
    })
})

let deleteUser = (id) => new Promise((resolve, reject)=>{
    let sql = `DELETE FROM client WHERE client.id = ${id}`;
    db.query(sql, function(err, result, fields){
        if(err){
            reject(err)
        }
        console.log(result.affectedRows + " rows have been affected")
        resolve({result})
    })
})

let editUser = (id, userData) => new Promise((resolve, reject) => {
    let sql = `UPDATE client SET 
            name = ${db.escape(userData.name)},
            surname = ${db.escape(userData.surname)},
            username = ${db.escape(userData.username)},
            email = ${db.escape(userData.email)},
            bio = ${db.escape(userData.bio)},
            avatar = ${db.escape(userData.avatar)} 
            WHERE id = ${db.escape(userData.id)}`
    db.query(sql, function (err, result, fields) {
        if (err) {
            reject(err)
        }
        console.log(result.affectedRows + " rows have been affected")
        resolve(userData)
    })
});

module.exports = {
    getUsers,
    getUser,
    registerUser,
    deleteUser,
    editUser
};