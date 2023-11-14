'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db');

module.exports = class ClassRoom extends Model {
  static init(sequelize) {
    return super.init(
      {
        classno: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        className: {
          type: DataTypes.STRING,
          allowNull: false
        },
        BoardId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'Board',
            key: 'boardId'
          }
        },
        classStatus: {
          type: DataTypes.ENUM('ALL', 'ONGOING', 'ENDED'),
          defaultValue: 'ALL',
          allowNull: false
        },
        classLevel: {
          type: DataTypes.STRING,
          allowNull: true
        },
        classCategory: {
          type: DataTypes.STRING,
          allowNull: true
        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: false
        },
        endDate: {
          type: DataTypes.DATE,
          allowNull: true
        },
        classTime: {
          type: DataTypes.STRING,
          allowNull: false
        },
        weeklyFrequency: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        scheduleDays: {
          type: DataTypes.STRING,
          allowNull: true
        },
        zoomURL: {
          type: DataTypes.STRING,
          allowNull: true
        },
        zoomID: {
          type: DataTypes.STRING,
          allowNull: true
        },
        zoomPassword: {
          type: DataTypes.STRING,
          allowNull: true
        },
        textbook: {
          type: DataTypes.STRING,
          allowNull: true
        },
      },
      {
        modelName: "ClassRoom",
        tableName: "ClassRoom",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
        timestamps: false,
      }
    );
  }

  static associate(db) {
  
  }
};
