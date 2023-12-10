"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkUpdate(
            "PromptsDALLE",
            { model: "dall-e-2" },
            { model: null },
            undefined
        );
    },
    async down(queryInterface, Sequelize) {},
};
