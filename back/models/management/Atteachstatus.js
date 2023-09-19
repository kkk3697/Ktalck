//출석 일지 테이블
'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');


module.exports = class Attendance extends Model {
  static init(sequelize) {
  return super.init({
  cno: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ClassRoom',
      key: 'cno'
    }
  },
  StudentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'StudentClass',
      key: 'StCID'
    }
  },
  TeacherId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'TeacherClass',
      key: 'thCID'
    }
  },
  AttendanceStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Date: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Attendance'
});
  }
}
