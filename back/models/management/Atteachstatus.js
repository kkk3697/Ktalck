//출석 일지 테이블
const { Model, DataTypes } = require('sequelize');

class Atteachstatus extends Model {}

Attendance.init({
  cno: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ClassRoom',
      key: 'cno'
    }
  },
  StudentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Student',
      key: 'stuNo'
    }
  },
  TeacherId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Teacher',
      key: 'tno'
    }
  },
  AttendanceStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Date: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Attendance'
});

module.exports = Atteachstatus;
