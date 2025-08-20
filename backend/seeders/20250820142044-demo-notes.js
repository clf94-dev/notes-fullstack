'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Notes', [{
        id: 1,
        title: 'Test Note',
        content: 'This is a test note content.',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1, // Assuming user with ID 1 exists
        
      },{
        id: 2,
        title: 'Another Note',
        content: 'This is another note content.',
        status: 'archived',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1, // Assuming user with ID 1 exists
      }], {});
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notes', null, {});
  }
};
