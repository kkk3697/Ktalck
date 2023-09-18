'use strict';
//출석 일지 테이블
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Atteachstatus', {
      uid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      cno: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ClassRoom',
          key: 'cno'
        }
      },
      StudentId: {  // 학생 아이디
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Student',
          key: 'stuNo'
        }
      },
      TeacherId: {  // 선생님 아이디
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Teacher',
          key: 'tno'
        }
      },
      AttendanceStatus: {  // 출석 상태
        type: Sequelize.STRING,
        allowNull: false
      },
      Date: {  // 날짜
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Atteachstatus');
  }
};