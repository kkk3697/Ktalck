const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: DataTypes.STRING(50),
          allowNull: false,
          field: 'userId',
          primaryKey: true,
        },
        password: {                   //비밀번호
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        email: {                      //email
          type: DataTypes.STRING(60),
          allowNull: false,
          unique: true,
        },
        mobile: {                     //mobile: 사용자의 핸드폰 번호를 저장. 문자열 형태, null 불가능.
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        gender: {
          type: DataTypes.STRING(5),  //gender: 사용자의 성별을 저장. "male", "female" 등으로 구분.
          allowNull: false,
        },    
        level: {                      
          type: DataTypes.INTEGER,    //level: 사용자 권한 레벨을 나타냄. 1은 학생, 2는 스튜던트, 3은 어드민 등으로 구분.
          allowNull: false,
          defaultValue: 1,
        },
      },
      {
        modelName: "User",
        tableName: "User",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.User.hasOne(db.Student, {
      foreignKey: 'userId',
      sourceKey: 'userId',
    });
    db.User.hasOne(db.Teacher, {
      foreignKey: 'userId',
      sourceKey: 'userId',
    });
  }
};