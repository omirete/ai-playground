"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const { DataTypes } = Sequelize;
        await queryInterface.addColumn("PromptsDALLE", "revisedPrompt", {
            type: DataTypes.TEXT,
            allowNull: true,
        });
        await queryInterface.changeColumn(
            "PromptsDALLE",
            "prompt",
            DataTypes.TEXT,
        );
    },
    async down(queryInterface, Sequelize) {
        const { DataTypes } = Sequelize;
        await queryInterface.removeColumn("PromptsDALLE", "revisedPrompt");
        await queryInterface.changeColumn(
            "PromptsDALLE",
            "prompt",
            DataTypes.TEXT,
        );
    },
};
