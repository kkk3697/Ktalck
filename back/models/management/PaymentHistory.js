'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

//결제 상태 관리
module.exports = class PaymentHistory extends Model {
  static init(sequelize) {
  return super.init({
      paymentId: {  // 내부적으로 사용되는 고유번호, auto-increment 설정
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      invoiceNumber: { // 외부 서비스의 인보이스 번호나 수동 결제의 경우를 위한 필드
        type: DataTypes.STRING,
        allowNull: true
      },
      stuNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Student', // 참조하는 테이블 이름
          key: 'stuNo'  // 참조하는 테이블의 실제 컬럼 이름
        }
      },
      amount: {  // 결제 금액
        type: DataTypes.FLOAT,
        allowNull: false
      },
      paymentMethod: {  // 결제 방법 (PayPal, 수동, 기타 등)
        type: DataTypes.STRING,
        allowNull: false
      },
      paymentDate: {  // 결제 날짜
        type: DataTypes.DATE,
        allowNull: false
      },
      expirationDate: {  // 결제 만료 날짜
        type: DataTypes.DATE,
        allowNull: false
      },
      cno: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'ClassRoom', // 참조하는 테이블 이름
          key: 'cno'  // 참조하는 테이블의 실제 컬럼 이름
        }
      },
      Paymentfrequency :          //결제빈도
      {
        type: DataTypes.INTEGER,
        allowNull: true 
      },
      paymentStatus: {  // 결제 상태 (Pending, Completed, Failed 등)
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending'
      },
}, 
{
  sequelize,  // 데이터베이스 연결 인스턴스
  modelName: 'PaymentHistory'
});
  }
}
