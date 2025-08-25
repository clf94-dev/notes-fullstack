'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
await queryInterface.createTable('Users',{
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false
    },
    colorTheme: {
      type: Sequelize.STRING,
      values: ['light', 'dark', 'system'],
      defaultValue: 'system'
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    lastLogin: {
      type: Sequelize.DATE,
      allowNull: true
    },
    fontTheme: {
      type: Sequelize.STRING, 
      values: ['sans-serif', 'serif', 'monospace'],
      defaultValue: 'sans-serif'
    }
  });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('Users'); 
  }
};
