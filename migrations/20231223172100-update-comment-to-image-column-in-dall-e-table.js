"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn("PromptsDALLE", "image", {
            type: Sequelize.DataTypes.STRING,
            comment: "Filename used for the image.",
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn("PromptsDALLE", "image", {
            type: Sequelize.DataTypes.STRING,
            comment: "URL that points to the image.",
        });
    },
};
