'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      reviewId: {  // 리뷰 아이디
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      writer: {  // 작성자 아이디
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',  // Users 테이블 참조
          key: 'uNo'
        }
      },
      content: {  // 리뷰 내용
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {  // 리뷰 작성 날짜
        type: Sequelize.DATE,
        allowNull: false
      },
      order: {  // 리뷰 순서
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews');
  }
};
