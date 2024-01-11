'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      nsame: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      is_company: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      date_of_birth: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      },
      profile_pic: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      is_subuser: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      main_company_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
      modified_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      }
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('users');
  }
};
