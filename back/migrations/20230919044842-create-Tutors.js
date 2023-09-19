'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tutors', {
      tutorId: {  // 선생님 아이디
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {  // 관련된 유저 아이디
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'uNo'
        }
      },
      writer: {  // 작성자 아이디
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',  // Users 테이블 참조
          key: 'uNo'
        }
      },
      description: {  // 선생님 소개글
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {  // 생성 날짜
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {  // 수정 날짜
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tutors');
  }
};
