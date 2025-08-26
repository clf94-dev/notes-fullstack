'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        await queryInterface.addColumn('Tags', 'userId',Sequelize.INTEGER)
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('Tags', 'userId' )
  }
};
