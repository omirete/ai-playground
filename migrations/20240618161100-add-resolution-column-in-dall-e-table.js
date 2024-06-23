"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("PromptsDALLE", "resolution", {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            comment: "Resolution as <width>x<height> in pixels.",
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("PromptsDALLE", "resolution");
    },
};
