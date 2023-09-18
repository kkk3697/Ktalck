const { Model, DataTypes } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      commentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    });
  
    return Comment;
  };
  