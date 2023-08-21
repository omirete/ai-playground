require("dotenv").config();
const mysql2 = require("mysql2");

module.exports = {
    username: process.env.DB_USR,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? ""),
    dialect: process.env.DB_DIALECT,
    dialectModule: mysql2,
    ssl: true,
    dialectOptions: {
        ssl: {
            key: process.env.DB_PRIVATE_KEY.replaceAll("\\n", "\n"),
            cert: process.env.DB_PUBLIC_KEY.replaceAll("\\n", "\n"),
            ca: process.env.DB_PUBLIC_KEY.replaceAll("\\n", "\n"),
        },
    },
};
