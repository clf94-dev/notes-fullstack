'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("NoteTags", {
      noteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Notes", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      tagId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Tags", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
    });

    // Optional: composite unique to prevent duplicates
    await queryInterface.addConstraint("NoteTags", {
      fields: ["noteId", "tagId"],
      type: "unique",
      name: "uniq_note_tag",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("NoteTags");
  }
};
