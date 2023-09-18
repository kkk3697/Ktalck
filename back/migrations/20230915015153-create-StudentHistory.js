'use strict';
//학생 히스토리
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('StudentHistory', {
      historyno: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      studentId: {  // 학생 아이디
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'StudentClass',  // 이 부분에서 'StudentClass' 테이블을 참조하게 설정
          key: 'StCID'           
        }
      },      
      className: {  // 클래스 이름
        type: Sequelize.STRING,
        allowNull: false
      },
      level: {  // 레벨
        type: Sequelize.STRING,
        allowNull: false
      },
      startDate: {  // 시작 날짜
        type: Sequelize.DATE,
        allowNull: false
      },
      endDate: {  // 종료 날짜
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {  // 생성된 시간
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {  // 업데이트된 시간
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('StudentHistory');
  }
};
