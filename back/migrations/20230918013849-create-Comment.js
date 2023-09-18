'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('Comment', { 
      
      commentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      cboardId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Board',
          key: 'boardId'
        }
      },
      parentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Comment',
          key: 'commentId'
        }
      },
      ctime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    
    });
   
  },

  async down (queryInterface, Sequelize) {
 
     await queryInterface.dropTable('Comment');
    
  }
};
