'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('StudentClass', {
      
      StCID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      stuNo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Student',  // 참조하는 테이블 이름
          key: 'stuNo'       // 참조하는 테이블의 실제 컬럼 이름
        }
      },
      cno: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ClassRoom',
          key: 'cno'
        }
      },
      couponCode: {   // 쿠폰 코드
        type: Sequelize.STRING,
        allowNull: true
      },
      discountRate: { // 할인율
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0  // 할인이 없을 경우 0으로 설정
      },

    attendance: {            //출석 정보
      type: Sequelize.JSON, // 출석 정보는 JSON 형태로
      allowNull: true,
    },
    weeklyPrice: {          //주간가격
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    weeklynumber :{         //주당 횟수
      type: Sequelize.INTEGER,
      allowNull : false,
    },
    });
  },
  
  async down (queryInterface, Sequelize) {
    // 테이블 삭제
    await queryInterface.dropTable('StudentClass');
  }
};