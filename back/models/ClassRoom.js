
//반 테이블
const { Model, DataTypes } = require('sequelize');

class ClassRoom extends Model {}

ClassRoom.init({
  cno: {  // 클래스 고유 번호
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  className: {  // 클래스 이름
    type: DataTypes.STRING,
    allowNull: false
  },
  classLevel: {  // 클래스 수준(초급, 중급, 고급 등)
    type: DataTypes.STRING,
    allowNull: true
  },
  classCategory: {  // 클래스 카테고리(예: 수학, 과학 등)
    type: DataTypes.STRING,
    allowNull: true
  },
  startDate: {  // 클래스 시작 날짜
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {  // 클래스 종료 날짜
    type: DataTypes.DATE,
    allowNull: false
  },
  classTime: {  // 수업 시간
    type: DataTypes.STRING,
    allowNull: false
  },
  zoomURL: {  // 줌 미팅 URL
    type: DataTypes.STRING,
    allowNull: true
  },
  zoomID: {  // 줌 미팅 ID
    type: DataTypes.STRING,
    allowNull: true
  },
  zoomPassword: {  // 줌 미팅 패스워드
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  sequelize,  
  modelName: 'ClassRoom'  // 모델 이름
});

module.exports = ClassRoom;
