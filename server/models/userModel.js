const {config: db} = require("../services/database");
const path = require('path');

// In this SQL query, we are selecting all columns from the client table.
let getUsers = () => new Promise((resolve, reject) => {
    db.query("SELECT * FROM client", function (err, client, fields) {
        if (err) {
            reject(err)
        } else {
            resolve(client);
        }
    })
})

// In this SQL query, we are selecting all columns from the client table where the id is equal to the id that is passed as a parameter.
let getUser = (id) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM client WHERE id=${id}`, function (err, client, fields) {
        if (err) {
            reject(err)
        } else {
            resolve(client[0]);
        }
    })
})

// In this SQL query, we are deleting a user from the client table where the id is equal to the id that is passed as a parameter.
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

// In this SQL query, we are updating the client table where the id is equal to the id that is passed as a parameter.
const editUser = (id, userData) => new Promise((resolve, reject) => {

    // ? - it is called parameterized query or dynamic query, and it is used to prevent SQL injection.
    const sql = `UPDATE client SET 
                     name = ?,
                     surname = ?,
                     username = ?,
                     email = ?,
                     bio = ?,
                     avatar = ?
                     WHERE id = ?`;

    db.query(sql, [userData.name, userData.surname, userData.username, userData.email, userData.bio, userData.avatar, id], function (err, result) {
        if (err) {
            console.error("Error editing user", err);
            reject(err);
        }
        console.log(result ? result.affectedRows + " rows have been affected" : "No rows affected");
        resolve(result);
    });
});



module.exports = {
    getUsers,
    getUser,
    deleteUser,
    editUser
};