const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          primaryKey: true,
          unique: true,
        },
        username: {  // firstName과 lastName을 합친 값
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        birth: {  // 생년월일
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        password: {  // 비밀번호
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        currentCity: {  // currentCity
          type: DataTypes.STRING(60),
          allowNull: false,
        },
        full_phone_number: {  // 전체 전화번호
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        level: {                      
          type: DataTypes.INTEGER,    //level: 사용자 권한 레벨을 나타냄. 1은 학생, 2는 스튜던트, 3은 어드민 등으로 구분.
          allowNull: false,
          defaultValue: 1,
        },
        timezone: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        Nationality: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        country: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
      },
      {
        modelName: "User",
        tableName: "User",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,timestamps: false,
      }
    );
  }
  static associate(db) {
    db.User.hasOne(db.Student, {
      foreignKey: 'email',
      sourceKey: 'email',
    });
    db.User.hasOne(db.Teacher, {
      foreignKey: 'email',
      sourceKey: 'email',
    });
  }
};