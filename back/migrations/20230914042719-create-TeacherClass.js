//강의일지
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('TeacherClass', {
      
      thCID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },  
      tno: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Teacher',
          key: 'tno'
        }
      },
      cno: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ClassRoom',
          key: 'cno'
        }
      },
      lectureNotes: {               //강의 일지
        type: Sequelize.TEXT,
        allowNull: true,
      },
      teachingHours: {              //수업 시간
        type: Sequelize.FLOAT,
        allowNull: true,
      },
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('TeacherClass');
  }
};
