import { DataTypes, Model } from "sequelize";
import { sequelize } from "~/src/helpers/DB";
import { MetaFields } from ".";

export interface UserFields {
    email: string;
    name: string;
}

class User extends Model<UserFields & MetaFields, UserFields> {}
User.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
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
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: "User", // We need to choose the model name
        tableName: "Users",
    }
);
User.create().then((u) => {
    u.dataValues;
});
export default User;
