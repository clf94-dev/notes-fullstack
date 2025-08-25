'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        await queryInterface.addColumn('Tags', 'createdAt',Sequelize.DATE)
        await queryInterface.addColumn('Tags', 'updatedAt', Sequelize.DATE)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Tags', 'updatedAt' )
    await queryInterface.removeColumn('Tags', 'createdAt')
  }
};
