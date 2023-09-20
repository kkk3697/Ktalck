'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.createTable('User', {
    uNo :{
      type: Sequelize.INTEGER,
      allowNull : false,
      unique : true,
      primaryKey: true,
      autoIncrement : true,
      
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
      primaryKey :true,
    },
    username: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    birth: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    // 프로필 이미지 경로를 저장하는 필드
    profileImage: {
      type: Sequelize.STRING,
      allowNull: true // 이미지는 선택적이니까 null 허용
    },
    currentCity: {
      type: Sequelize.STRING(60),
      allowNull: false,
    },
    profileImage: {
      type: Sequelize.STRING,
      allowNull: true // 이미지는 선택적이니까 null 허용
    },
    full_phone_number: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    level: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    timezone: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    Nationality: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    language: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
  }, {
    
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    timestamps: false,
  });
},

async down (queryInterface, Sequelize) {
  await queryInterface.dropTable('User');
}
};
