const mysql= require("mysql2/promise")

const mysqlPool =mysql.createPool({
    host:"localhost",
    user:"root",
    password:"jishnu12345",
    database:"jobs"

})
module.exports =mysqlPool;