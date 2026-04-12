const mysql2 = require("mysql2/promise.js");

const db = mysql2.createPool({
    host:"localhost",
        user:"root",
        password:"$trongPassword123",
        database:"hotel"
})

module.exports = db;