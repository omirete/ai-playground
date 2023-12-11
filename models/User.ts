import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/src/helpers/DB";
import { type MetaFields } from ".";

export interface UserFields {
    email: string;
    name: string;
    pwdHash: string;
}

class User extends Model<UserFields & MetaFields, UserFields> {}
User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pwdHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "User",
        tableName: "Users",
        indexes: [
            {
                unique: true,
                fields: ["email"],
            },
        ],
    },
);

export default User;
