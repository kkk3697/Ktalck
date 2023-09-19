'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

module.exports = class Board extends Model {
  static init(sequelize) {
  return super.init({
  boardId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  btitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bcontent: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  btime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  blevel: { // 사용자 권한 1: Student, 2: Teacher, Admin: 3
    type: DataTypes.STRING,
    allowNull: false
  },
  targetGroup: {
    type: DataTypes.STRING,     //'All', 'Student','StudentAll', 'Teacher',TeacherAll
    allowNull: true 
  }
}, {
  sequelize,
  modelName: 'Board'
});
  }
}
