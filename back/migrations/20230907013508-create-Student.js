'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Student', {
      userId: {
        type: Sequelize.STRING(50),
        references: {
          model: 'User',  // 참조하는 테이블의 이름
          key: 'userId'   // 참조하는 테이블의 실제 컬럼 이름
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      stuNo: {                        //학생번호
        type: Sequelize.INTEGER,
        allowNull: true,
        autoIncrement: true,
        primaryKey: true
      },
      stuLanguage: {                  //학생이 가능한 언어
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      stuCountry: {                   //학생의 국가
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Student');
  }
};
