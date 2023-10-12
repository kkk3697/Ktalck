'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

const STUDENT_STATES = {    
  PENDING: 0,       //가입 신청상태
  AFTER_MEETING: 1, //줌 미팅 전 상태
  BEFORE_MEETING: 2, //줌미팅 후 상태
  ACTIVE: 2,        //재학생
  GRADUATED: 3,     //졸업생
  PAUSED: 4         //휴학생
};

module.exports = class Student extends Model {
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
          stuNo: {                        //학생번호
            type: DataTypes.INTEGER,
            allowNull: true,  
            autoIncrement: true,
            primaryKey: true,
          },
          Nickname:             //별칭
          {
            type: DataTypes.STRING,
            allowNull: true,
          },
          stuLanguage: {                  //학생이 가능한 언어
            type: DataTypes.STRING(100),
            allowNull: true,
          },
          stuCountry: {                   //학생의 국가
            type: DataTypes.STRING(100),
            allowNull: true,
          },
          StudentState: {                 //학생의 상태
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: STUDENT_STATES.PENDING,
          },
        },
        {
          modelName: "Student",
          tableName: "Student",
          charset: "utf8mb4",
          collate: "utf8mb4_general_ci",
          sequelize,
          timestamps: true,

          
        }
      );
    }
    static associate(db) {
      db.Student.belongsTo(db.User, {
        foreignKey: 'email',
        targetKey: 'email'
      });

      db.Student.hasMany(db.StudentClass, {
        foreignKey: 'stuNo',
        sourceKey: 'stuNo'
      });
    }
  };