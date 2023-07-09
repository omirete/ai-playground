import { Sequelize } from "sequelize";
import mysql2 from 'mysql2';

export const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PWD as string,
    {
        host: process.env.DB_HOST as string,
        dialect: "mysql",
        dialectModule: mysql2
    }
);
