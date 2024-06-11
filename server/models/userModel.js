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
module.exports = {
    getUsers,
    getUser
};