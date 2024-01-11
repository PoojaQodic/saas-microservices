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
    await queryInterface.createTable('companies', {
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
      company_address: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      city: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      state: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: null
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      logo: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
        field: 'created_at'
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
        field: 'modified_at'
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
    await queryInterface.dropTable('companies');
  }
};
