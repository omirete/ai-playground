import { DataTypes, Model } from "sequelize";
import { sequelize } from "~/src/helpers/DB";
import { MetaFields } from ".";

export interface PromptGPTFields {
    prompt: string;
    model: string;
    systemPrompt?: string;
    answer: string;
}

class PromptGPT extends Model<PromptGPTFields & MetaFields, PromptGPTFields> {}
PromptGPT.init(
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
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        systemPrompt: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        answer: {
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
        modelName: "PromptGPT",
        tableName: "PromptsGPT",
    }
);

export default PromptGPT;
