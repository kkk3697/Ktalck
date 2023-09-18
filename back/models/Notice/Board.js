const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Board = sequelize.define('Board', {
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
      blevel: {                     //사용자 권한 1 : Student , 2 : Teacher ,Admin : 3
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    return Board;
  };
  