'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Notes', 'tags',Sequelize.ARRAY(Sequelize.INTEGER))
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Notes', 'tags');
  }
};
