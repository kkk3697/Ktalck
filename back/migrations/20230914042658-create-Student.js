'use strict';
const STUDENT_STATES = {    
  PENDING: 0,       //가입 신청상태
  AFTER_MEETING: 1, //줌 미팅 후 상태
  ACTIVE: 2,        //재학생
  GRADUATED: 3,     //졸업생
  PAUSED: 4         //휴학생
};

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Student', {
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        references: {
          model: 'User', // 참조하는 테이블 이름
          key: 'email'  // 참조하는 테이블의 실제 컬럼 이름
        },
      },
      Nickname:             //별칭
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
      stuNo: {                        //학생번호
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      stuLanguage: {                  //학생이 가능한 언어
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      stuCountry: {                   //학생의 국가
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      StudentState: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: STUDENT_STATES.PENDING,
      },
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      timestamps: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Student');
  }
};
