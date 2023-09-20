//선생클래스의 중간 클래스
'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

module.exports = class TeacherClass extends Model {
  static init(sequelize) {
  return super.init({
  
    thCID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },  
  
    teacherId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Teacher',
      key: 'tno'
    }
  },
  cno: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ClassRoom',
      key: 'cno'
    }
  },
  lectureNotes: {               //강의 일지
    type: DataTypes.TEXT,
    allowNull: true,
  },
  teachingHours: {              //수업 시간
    type: DataTypes.FLOAT,
    allowNull: true,
  },
}, {
    sequelize,  
    modelName: 'TeacherClass'
});
  }
}

