import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/src/helpers/DB";
import { type MetaFields } from ".";

export interface PromptGPTFields {
    prompt: string;
    model: string;
    systemPrompt?: string;
    answer: string;
    userId: string;
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
            type: DataTypes.TEXT,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        systemPrompt: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        answer: {
            type: DataTypes.TEXT,
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
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "Users",
                key: "id",
            },
        },
    },
    {
        sequelize,
        modelName: "PromptGPT",
        tableName: "PromptsGPT",
    }
);

export default PromptGPT;
