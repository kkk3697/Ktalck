'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Teacher', {
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        references: {
          model: 'User',
          key: 'email'
        },
      },
      tno: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      teaLanguage: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      bankNo: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      privatenumber : {               //주민 등록 번호
        type : Sequelize.STRING(20),
        allowNull : true,
      },
      gender: {
        type: Sequelize.STRING(10),  // 성별
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING(200),  // 주소
        allowNull: true,
      },
      detailAddress: {
        type: Sequelize.STRING(100),  // 상세 주소
        allowNull: true,
      }, 
      zoomMeetingLink: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('Working', 'OnLeave', 'retiring'),
        allowNull: false,
        defaultValue: 'Employed'
      },
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      timestamps: true
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Teacher');
  }
};