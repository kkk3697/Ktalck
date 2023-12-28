'use strict';
//학생 중간 테이블

const { Model, DataTypes, STRING } = require('sequelize');
const sequelize = require('../db');


module.exports = class StudentClass extends Model {
  static init(sequelize) {
  return super.init({
  StCID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    defaultValue : 0,
  },
  stuNo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Student',  // 참조하는 테이블 이름
      key: 'stuNo'       // 참조하는 테이블의 실제 컬럼 이름
    }
  },
  classno: {
    type: DataTypes.INTEGER,
    references: {
      model: 'ClassRoom',
      key: 'classno'
    },
    allowNull : true, // 또는 false로 선택해야 해.
  },
  attendance: {            //출석 정보
    type: DataTypes.JSON, // 출석 정보는 JSON 형태로
    allowNull: true,
  },
  weeklyPrice: {          //주간가격
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  weeklynumber :{         //주당 횟수
    type: DataTypes.INTEGER,
    allowNull : true,
  },
  couponCode: {   // 쿠폰 코드
    type: DataTypes.STRING,
    allowNull: true
  },
  discountRate: { // 할인율
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0  // 할인이 없을 경우 0으로 설정
  },
  zoomMeetingData: {    //줌미팅 일자
    type: DataTypes.DATE,
    allowNull: true,
  }
,
zoomMeetingDataMemo: {
  type : DataTypes.TEXT,
  allowNull : true
}
,
  zoomMeetingTeacher: {  // Zoom 미팅 강사 (고정)
    type: DataTypes.STRING,
    allowNull: true
  },
  scheduledLevel: {  // 예정 레벨 (고정)
    type: DataTypes.STRING,
    allowNull: true
  },
  zoomMeetingLink: { //줌미팅 링크
    type: DataTypes.STRING,
    allowNull: true
  },
  timeDifference: { //시간 시차
    type: DataTypes.INTEGER,
    allowNull: true
  }
  ,
}, 
{
    sequelize,
    modelName: 'StudentClass',
    tableName: 'studentclass'  // 실제 DB의 테이블 이름
    , timestamps: false 

});
  }

  static associate(db) {
    db.StudentClass.belongsTo(db.Student, {
      foreignKey: 'stuNo',
      targetKey: 'stuNo'
    });
  
    db.StudentClass.belongsTo(db.Teacher, {
      foreignKey: 'zoomMeetingTeacher',
      targetKey: 'tno'
    });
  }
}

