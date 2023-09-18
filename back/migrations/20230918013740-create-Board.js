'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Board', {
      boardId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      btitle: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bcontent: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      btime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      blevel: {                     //사용자 권한 1 : Student , 2 : Teacher ,Admin : 3
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Board');
  }
};
