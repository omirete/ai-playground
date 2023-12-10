"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const { DataTypes } = Sequelize;
        await queryInterface.addColumn(
            "PromptsDALLE",
            "model",
            {
                type: DataTypes.ENUM,
                allowNull: true,
                values: ["dall-e-2", "dall-e-3"],
            }
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn(
            "PromptsDALLE",
            "model"
        )
    },
};
