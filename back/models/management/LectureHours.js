'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
//강의 시수 테이블


module.exports = class LectureHours extends Model {
  static init(sequelize) {
  return super.init({
  // 강의 시수의 고유번호, auto-increment 설정
  lectureHourId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  // 해당 강의 시수의 클래스 번호, ClassRoom 테이블과 연결
  cno: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ClassRoom',
      key: 'cno'
    }
  },
  // 해당 강의 시수의 선생님 번호, Teacher 테이블과 연결
  tno: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'TeacherClass',
      key: 'thCID'
    }
  },
  // 해당 강의의 시간 (시수)
  hours: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  // 계산 방법 ('auto' 또는 'manual')
  calculationMethod: {  
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'LectureHours'
});
  }
}
