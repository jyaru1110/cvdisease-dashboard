const mysql = require('promise-mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    database: 'cv_user_data',
    user : 'jyaru',
    password : 'jyaru'
});

const get_connection = async () => {
    return await connection;
}

module.exports = {
    get_connection
}