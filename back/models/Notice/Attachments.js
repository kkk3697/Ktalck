'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');


module.exports = class Attachments extends Model {
  static init(sequelize) {
  return super.init({
      attachId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      boardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Board',
          key: 'boardId'
        }
      },
      filePath: {
        type: DataTypes.STRING,
        allowNull: false
      }
    
    }, {
      sequelize,
      modelName: 'Attachments'
    });
  }
}
