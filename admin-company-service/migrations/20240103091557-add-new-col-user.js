'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn('users', 'address', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue:null
        // other column1 options...
      }),
      queryInterface.addColumn('users', 'city', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue:null
        // other column2 options...
      }),
      queryInterface.addColumn('users', 'status', {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue:null
        // other column2 options...
      }),
      // Add more columns as needed
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('userss');
     */
    return Promise.all([
      queryInterface.removeColumn('users', 'address'),
      queryInterface.removeColumn('users', 'city'),
      queryInterface.removeColumn('users', 'status'),
      // Remove more columns as needed
    ]);
  }
};
