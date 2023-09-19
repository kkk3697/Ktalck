'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ClassRoom', {
      cno: {  // 클래스 고유 번호
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      className: {  // 클래스 이름
        type: Sequelize.STRING,
        allowNull: false
      },
      classLevel: {  // 클래스 수준(초급, 중급, 고급 등)
        type: Sequelize.STRING,
        allowNull: true
      },
      BoardId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Board', // Board 모델을 참조
          key: 'boardId' // Board 모델의 boardId를 참조
        }
      },
      classCategory: {  // 클래스 카테고리(예: 수학, 과학 등)
        type: Sequelize.STRING,
        allowNull: true
      },
      startDate: {  // 클래스 시작 날짜
        type: Sequelize.DATE,
        allowNull: false
      },
      endDate: {  // 클래스 종료 날짜
        type: Sequelize.DATE,
        allowNull: false
      },
      classTime: {  // 수업 시간
        type: Sequelize.STRING,
        allowNull: false
      },
      zoomURL: {  // 줌 미팅 URL
        type: Sequelize.STRING,
        allowNull: true
      },
      zoomID: {  // 줌 미팅 ID
        type: Sequelize.STRING,
        allowNull: true
      },
      zoomPassword: {  // 줌 미팅 패스워드
        type: Sequelize.STRING,
        allowNull: true
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('ClassRoom');
  }
};
