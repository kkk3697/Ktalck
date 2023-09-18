const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  
    const Attachments = sequelize.define('Attachments', {
      attachId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    });
  
    return Attachments;
  };