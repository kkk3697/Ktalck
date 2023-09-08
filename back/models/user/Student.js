const { Model, DataTypes } = require('sequelize');

module.exports = class Student extends Model {
    static init(sequelize) {
      return super.init(
        {
          userId: {
            type: DataTypes.STRING(50),
            allowNull: false,
            references: {
              model: 'User', // 참조하는 테이블 이름
              key: 'userId'  // 참조하는 테이블의 실제 컬럼 이름
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          stuNo: {                        //학생번호
            type: DataTypes.INTEGER,
            allowNull: true,
            autoIncrement: true,
            primaryKey: true
          },
          stuLanguage: {                  //학생이 가능한 언어
            type: DataTypes.STRING(100),
            allowNull: true,
          },
          stuCountry: {                   //학생의 국가
            type: DataTypes.STRING(100),
            allowNull: true,
          },
          // 여기에 학생만의 필드를 추가
        },
        {
          modelName: "Student",
          tableName: "Student",
          charset: "utf8mb4",
          collate: "utf8mb4_general_ci",
          sequelize,
        }
      );
    }
    static associate(db) {
      db.Student.belongsTo(db.User, {
        foreignKey: 'userId',
        targetKey: 'userId'
      });
    }
  };