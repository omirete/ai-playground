import { type Options, Sequelize } from "sequelize";
import mysql2 from "mysql2";

const connection_string: string = process.env.DB_CONNECTION_STRING as string;

export const sequelizeOpts: Options = {
    dialectModule: mysql2,
};

export const sequelize = new Sequelize(connection_string, sequelizeOpts);
