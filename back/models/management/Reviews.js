// Review.js
'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

module.exports = class Reviews extends Model {
  static init(sequelize) {
    return super.init({
      reviewId: {
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
      content: { // 리뷰 내용
        type: DataTypes.TEXT,
        allowNull: false
      },
      createdAt: { // 등록 날짜
        type: DataTypes.DATE,
        allowNull: false
      },
      order: { // 리뷰 순서
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Reviews'
    });
  }
}
