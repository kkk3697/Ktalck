'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Teacher', {
      userId: {
        type: Sequelize.STRING(100),
        references: {
          model: 'User',  // 참조하는 테이블의 이름
          key: 'userId'   // 참조하는 테이블의 실제 컬럼 이름
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      tno:{
        type : Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      teaLanguage: {
        type: Sequelize.STRING(100), // teaLanguage: 강사가 가르치는 언어를 저장하는 컬럼  
        allowNull: true,
      },
      bankNo: {                      //bankNo: 강사의 은행 계좌 번호를 저장하는 컬럼.
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Teacher');
  }
};
