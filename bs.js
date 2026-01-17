import mysql from "mysql2"

const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "rootroot",
    database : "db_blogs"
});

connection.connect((err) => {
    if (err) throw err
    else (console.log("connected to mysql"))
})


export default connection 