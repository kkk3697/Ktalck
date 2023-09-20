// models/Tutors.js
'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

module.exports = class Tutors extends Model {
  static init(sequelize) {
    return super.init({
      tutorId: {  // 선생님 아이디
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      writer: { // 작성자
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',  // 작성자는 User 모델을 참조
          key: 'userId'
        }
      },
      userId: {  // 관련된 유저 아이디
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'userId'
        }
      },
      description: {  // 선생님 소개글
        type: DataTypes.TEXT,
        allowNull: true
      },
      // 여기에 추가적인 필드들을 넣을 수 있어
    }, {
      sequelize,
      modelName: 'Tutors'
    });
  }
}
