const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// 모델 불러오기
const User = require('./User/User');
const Student = require('./User/Student');
const Teacher = require('./User/Teacher');

const StudentClass = require('./management/StudentClass');
const StudentHistory = require('./management/StudentHistory');
const TeacherClass = require('./management/TeacherClass');
const Atteachstatus = require('./management/Atteachstatus');
const PaymentHistory = require('./management/PaymentHistory');
const Review        = require('./management/Reviews');

const Board = require('./Notice/Board');
const Comment = require('./Notice/Comment');
const Attachments = require('./Notice/Attachments');

const ClassRoom = require('./ClassRoom');

// 모델 초기화
User.init(sequelize);
Student.init(sequelize);
Teacher.init(sequelize);
StudentClass.init(sequelize);
StudentHistory.init(sequelize);
TeacherClass.init(sequelize);
Atteachstatus.init(sequelize);
PaymentHistory.init(sequelize);
Board.init(sequelize);
Comment.init(sequelize);
Attachments.init(sequelize);
ClassRoom.init(sequelize);
Review.init(sequelize);

// DB에 할당
db.User = User;
db.Student = Student;
db.Teacher = Teacher;
db.StudentClass = StudentClass;
db.StudentHistory = StudentHistory;
db.TeacherClass = TeacherClass;
db.Atteachstatus = Atteachstatus;
db.PaymentHistory = PaymentHistory;
db.Board = Board;
db.Comment = Comment;
db.Attachments = Attachments;
db.ClassRoom = ClassRoom;
db.Review = Review;

// 관계 설정
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
