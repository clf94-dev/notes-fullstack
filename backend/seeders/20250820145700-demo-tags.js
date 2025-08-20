'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('Tags', [{
        id: 1,
        name: 'Dev',
     }, {
        id: 2,
        name: 'Fitness'
      }], {});
  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Tags', null, {});
  
  }
};
