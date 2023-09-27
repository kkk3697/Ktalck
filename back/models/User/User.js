'use strict';
const Student = require('./Student');
const Teacher = require('./Teacher');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        uNo :{
          type: DataTypes.INTEGER,
          allowNull : false,
          primaryKey: true,
          autoIncrement: true,
          unique : true,
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
        },
        username: {  // firstName과 lastName을 합친 값
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        // 프로필 이미지 경로를 저장하는 필드
        profileImage: {
          type: DataTypes.STRING,
          allowNull: true // 이미지는 선택적이니까 null 허용
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
        language :{
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        Nationality: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'User',
        hooks: {
        
    afterCreate: async (user, options) => {
    const transaction = await sequelize.transaction();
    try {
  

    
      if (parseInt(user.level) === 1){
        console.log("레벨 1이니 Student에 넣을게.");
        await Student.create({
          email: user.email,
        }, { transaction });
      } 
      

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
},
  autoIncrement: false, 
  timestamps: false,
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