import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/src/helpers/DB";
import { type MetaFields } from ".";

export interface PromptDALLEFields {
    prompt: string;
    revisedPrompt: string | null;
    model: string | null;
    image: string;
    userId: string;
    variationOf: string | null;
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
            type: DataTypes.TEXT,
            allowNull: false,
        },
        revisedPrompt: {
            type: DataTypes.TEXT,
            comment:
                'When using dall-e 3, a revised prompt is generated by OpenAI. This is done because dall-e 3 apparently works better with highly detailed prompts. To overcome this, just tell the model to use the given prompt "as is", for example: "give my prompt to DALL-E verbatim: <and here your prompt>".',
            allowNull: true,
        },
        model: {
            type: DataTypes.ENUM("dall-e-2", "dall-e-3"),
            allowNull: true,
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
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "Users",
                key: "id",
            },
        },
        variationOf: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: "PromptsDALLE",
                key: "id",
            },
        },
    },
    {
        sequelize,
        modelName: "PromptDALLE",
        tableName: "PromptsDALLE",
    },
);

export default PromptDALLE;
