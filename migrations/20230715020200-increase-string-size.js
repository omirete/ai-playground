"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const { DataTypes } = Sequelize;
        await queryInterface.changeColumn("PromptsGPT", "prompt", DataTypes.TEXT);
        await queryInterface.changeColumn("PromptsGPT", "systemPrompt", DataTypes.TEXT);
        await queryInterface.changeColumn("PromptsGPT", "answer", DataTypes.TEXT);
        await queryInterface.changeColumn("PromptsDALLE", "prompt", DataTypes.STRING(1024));
    },
    async down(queryInterface, Sequelize) {},
};
