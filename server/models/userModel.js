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

module.exports = {getUsers};