import { Dialect, Options, Sequelize } from "sequelize";
import mysql2 from "mysql2";

export const dbSSL: boolean = process.env.DB_PRIVATE_KEY !== undefined

export const sequelizeOpts: Options = {
    username: process.env.DB_USR,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? ""),
    dialect: process.env.DB_DIALECT as Dialect,
    dialectModule: mysql2,
    ssl: dbSSL,
    dialectOptions: {
        ssl: dbSSL ? {
            key: (process.env.DB_PRIVATE_KEY as string).replaceAll("\\n", "\n"),
            cert: (process.env.DB_PUBLIC_KEY as string).replaceAll("\\n", "\n"),
            ca: (process.env.DB_PUBLIC_KEY as string).replaceAll("\\n", "\n"),
        } : undefined,
    },
};

export const sequelize = new Sequelize(sequelizeOpts as Options);
