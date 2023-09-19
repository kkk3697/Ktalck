'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('Attachments', {
    attachId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    boardId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Board',
        key: 'boardId'
      }
    },
    filePath: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('Attachments'); 
  }
};
