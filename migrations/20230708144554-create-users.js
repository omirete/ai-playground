"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const { DataTypes } = Sequelize;
        await queryInterface.createTable("Users", {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
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
        });
        await queryInterface.addColumn("PromptsGPT", "userId", {
            type: DataTypes.UUID,
            references: { key: "id", model: "Users" },
        });
        await queryInterface.addColumn("PromptsDALLE", "userId", {
            type: DataTypes.UUID,
            references: { key: "id", model: "Users" },
        });
    },
    async down(queryInterface, Sequelize) {},
};
