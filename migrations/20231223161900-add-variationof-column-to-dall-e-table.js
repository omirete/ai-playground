"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const { DataTypes } = Sequelize;
        await queryInterface.addColumn("PromptsDALLE", "variationOf", {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: "PromptsDALLE",
                key: "id",
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("PromptsDALLE", "variationOf");
    },
};
