'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('StudentClass', {
      
      StCID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      stuNo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Student',  // 참조하는 테이블 이름
          key: 'stuNo'       // 참조하는 테이블의 실제 컬럼 이름
        }
      },
      classno: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ClassRoom',
          key: 'classno'
        },
        allowNull: true,
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
      allowNull: true,
    },
    weeklynumber :{         //주당 횟수
      type: Sequelize.INTEGER,
      allowNull : true,
    },
    zoomMeetingData: {      //Zoom 미팅 예정 일시
      type: Sequelize.DATE,
      allowNull: true,
    },  
    zoomMeetingDataMemo: {
      type : Sequelize.TEXT,
      allowNull : true
    },
    zoomMeetingTeacher: {  // Zoom 미팅 강사 (고정)
      type: Sequelize.STRING,
      allowNull: true
    },
    scheduledLevel: {  // 예정 레벨 (고정)
      type: Sequelize.STRING,
      allowNull: true
    },
    zoomMeetingLink: { //줌미팅 링크
      type: Sequelize.STRING,
      allowNull: true
    },
    timeDifference: { //시간 시차
      type: Sequelize.INTEGER,
      allowNull: true
    },
    });
  },
  
  async down (queryInterface, Sequelize) {
    // 테이블 삭제
    await queryInterface.dropTable('StudentClass');
  }
};
