import { DataTypes, Model } from "sequelize";
import { sequelize } from "~/src/helpers/DB";
import { MetaFields } from ".";

export interface PromptDALLEFields {
    prompt: string;
    image: string;
}

class PromptDALLE extends Model<
    PromptDALLEFields & MetaFields,
    PromptDALLEFields
> {}
PromptDALLE.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        prompt: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "URL that points to the image.",
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        // userId: {
        //     type: DataTypes.UUID,
        //     allowNull: false,
        //     references: {
        //         model: "Users",
        //         key: "id",
        //     },
        // },
    },
    {
        sequelize,
        modelName: "PromptDALLE",
        tableName: "PromptsDALLE",
    }
);

export default PromptDALLE;
