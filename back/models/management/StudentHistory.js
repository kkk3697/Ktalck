//학생 히스토리 내역 수업 시작일 ,종료일 (종료일은 연장을 그만둘시 자동으로 데이터 저장되서 혹은 반빼기 종료했을때 저장되게)
'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

module.exports = class StudentHistory extends Model {
  static init(sequelize) {
  return super.init({
    historyno: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      studentId: {  // 학생 아이디
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'StudentClass',  // 이 부분에서 'StudentClass' 테이블을 참조하게 설정
          key: 'StCID'           
        }
      },      
      className: {  // 클래스 이름
        type: DataTypes.STRING,
        allowNull: false
      },
      level: {  // 레벨
        type: DataTypes.STRING,
        allowNull: false
      },
      startDate: {  // 시작 날짜
        type: DataTypes.DATE,
        allowNull: false
      },
      endDate: {  // 종료 날짜
        type: DataTypes.DATE,
        allowNull: true
      },
      createdAt: {  // 생성된 시간
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {  // 업데이트된 시간
        allowNull: false,
        type: DataTypes.DATE
      }
}, 
{
  sequelize,
  modelName: 'StudentHistory',
  timestamps: true,  // createdAt, updatedAt 컬럼 자동 생성
});
  }
}
