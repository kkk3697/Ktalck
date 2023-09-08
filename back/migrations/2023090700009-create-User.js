'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      userId: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: 'userId',
        primaryKey: true,
      },
      password: {                   //비밀번호
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {                      //email
        type: Sequelize.STRING(60),
        allowNull: false,
        unique: true,
      },
      mobile: {                     //mobile: 사용자의 핸드폰 번호를 저장. 문자열 형태, null 불가능.
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING(5),  //gender: 사용자의 성별을 저장. "male", "female" 등으로 구분.
        allowNull: false,
      },    
      level: {                      
        type: Sequelize.INTEGER,    //level: 사용자 권한 레벨을 나타냄. 1은 학생, 2는 스튜던트, 3은 어드민 등으로 구분.
        allowNull: false,
        defaultValue: 1,
      },
      
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  }
};
