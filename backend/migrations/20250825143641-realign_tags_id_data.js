'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
      await queryInterface.sequelize.query(`
      SELECT setval(pg_get_serial_sequence('"Tags"', 'id'),
                    COALESCE((SELECT MAX("id") FROM "Tags"), 0));
    `);
  },
  async down () {
    // No need to revert the sequence adjustment
  }
};
