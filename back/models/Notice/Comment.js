'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

module.exports = class Comment extends Model {
  static init(sequelize) {
    return super.init({
      commentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      cboardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Board',
          key: 'boardId'
        }
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Comment',
          key: 'commentId'
        }
      },
      ctime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Comment'
    });
  }
}


