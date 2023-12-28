'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('TeacherClass', 'classRoomId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'ClassRoom', // ClassRooms 테이블 이름이 맞는지 확인해야 해
        key: 'classno', // ClassRoom 테이블의 참조할 키 이름이 맞는지 확인해야 해
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down (queryInterface, Sequelize) {
    await zqueryInterface.removeColumn('TeacherClass', 'classRoomId');
  }
};
