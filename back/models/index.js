const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const attachment = require('./Notice/Attachment');
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

// 모델 파일을 동적으로 로드하거나 수동으로 불러오는 코드를 넣는다.

// 예를 들어, 수동으로 모델을 불러오는 경우
const User = require('./User/User')(sequelize);
const Student = require('./User/Student')(sequelize);
const Teacher = require('./User/Teacher')(sequelize);

const StudentClass = require('./management/StudentClass')(sequelize);
const StudentHistory = require('./management/StudentHistory')(sequelize);
const TeacherClass = require('./management/TeacherClass')(sequelize);
const Atteachstatus = require('./management/Atteachstatus')(sequelize);
const PaymentHistory = require('./management/PaymentHistory')(sequelize);

const Board = require('./Notice/Board')(sequelize);
const Comment = require('./Notice/Comment')(sequelize);
const Attachments = require('./Notice/Attachments')(sequelize);

const ClassRoom = require('./ClassRoom')(sequelize);


db.User = User;
db.Student = Student;
db.Teacher = Teacher;
db.StudentClass = StudentClass;
db.TeacherClass = TeacherClass;
db.StudentHistory = StudentHistory;
db.Atteachstatus = Atteachstatus;
db.PaymentHistory = PaymentHistory;
db.ClassRoom = ClassRoom;
db.Board = Board;
db.Comment = Comment;
db.Attachments = Attachments;


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
