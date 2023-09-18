'use strict';
//강의 시수 테이블
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('LectureHours', {
      // 강의 시수의 고유번호, auto-increment 설정
      lectureHourId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      // 해당 강의 시수의 클래스 번호, ClassRoom 테이블과 연결
      cno: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ClassRoom',
          key: 'cno'
        }
      },
      // 해당 강의 시수의 선생님 번호, Teacher 테이블과 연결
      tno: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Teacher',
          key: 'tno'
        }
      },
      // 해당 강의의 시간 (시수)
      hours: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      // 계산 방법 ('auto' 또는 'manual')
      calculationMethod: {  
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('LectureHours');
  }
};
