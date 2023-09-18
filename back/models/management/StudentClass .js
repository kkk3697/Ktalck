//학생 중간 테이블

const { Model, DataTypes } = require('sequelize');

class StudentClass extends Model {}

StudentClass.init({
   
  StCID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Student',  // 참조하는 테이블 이름
        key: 'stuNo'       // 참조하는 테이블의 실제 컬럼 이름
      }
    },
    cno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ClassRoom',
        key: 'cno'
      }
    },
  attendance: {            //출석 정보
    type: DataTypes.JSON, // 출석 정보는 JSON 형태로
    allowNull: true,
  },
  weeklyPrice: {          //주간가격
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  weeklynumber :{         //주당 횟수
    type: DataTypes.INTEGER,
    allowNull : false,
  },
  couponCode: {   // 쿠폰 코드
    type: DataTypes.STRING,
    allowNull: true
  },
  discountRate: { // 할인율
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0  // 할인이 없을 경우 0으로 설정
  },

}, 
{
  sequelize,  // 데이터베이스 연결 인스턴스
  modelName: 'StudentClass'
});



module.exports = StudentClass;
