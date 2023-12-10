require("dotenv").config();

module.exports = {
    url: process.env.DB_CONNECTION_STRING,
    dialectModule: require('mysql2'),
}
