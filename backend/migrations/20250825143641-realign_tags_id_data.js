'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await q.sequelize.query(`
      SELECT setval(pg_get_serial_sequence('"Tags"', 'id'),
                    COALESCE((SELECT MAX("id") FROM "Tags"), 0));
    `);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
