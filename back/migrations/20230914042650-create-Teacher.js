'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Teacher', {
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        references: {
          model: 'User',
          key: 'email'
        },
      },
      tno: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      teaLanguage: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      bankNo: {
        type: Sequelize.STRING(50),
        allowNull: true
      }
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Teacher');
  }
};