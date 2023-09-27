'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

module.exports = class Teacher extends Model {
    static init(sequelize) {
      return super.init(
        {
          email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          references: {
            model: 'User', // 참조하는 테이블 이름
            key: 'email'  // 참조하는 테이블의 실제 컬럼 이름
          },
        },
          tno:{
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          teaLanguage: {
            type: DataTypes.STRING(100), // teaLanguage: 강사가 가르치는 언어를 저장하는 컬럼  
            allowNull: true,
          },
          bankNo: {                      //bankNo: 강사의 은행 계좌 번호를 저장하는 컬럼.
            type: DataTypes.STRING(50),
            allowNull: true,
          },
          privatenumber : {               //주민 등록 번호
            type : DataTypes.STRING(20),
            allowNull : true,
          },
          gender: {
            type: DataTypes.STRING(10),  // 성별
            allowNull: true,
          },
          address: {
            type: DataTypes.STRING(200),  // 주소
            allowNull: true,
          },
          detailAddress: {
            type: DataTypes.STRING(100),  // 상세 주소
            allowNull: true,
          },
          // 여기에 강사만의 필드를 추가
        },
        {
          modelName: "Teacher",
          tableName: "Teacher",
          charset: "utf8mb4",
          collate: "utf8mb4_general_ci",
          sequelize,
          timestamps: true

        }
      );
    }
    static associate(db) {
      db.Teacher.belongsTo(db.User, {
        foreignKey: 'email',
        targetKey: 'email'
      });
    }
  };
  