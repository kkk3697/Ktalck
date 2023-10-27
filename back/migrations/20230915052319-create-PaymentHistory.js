'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PaymentHistories', {
      paymentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      invoiceNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      stuNo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'StudentClass',
          key: 'StCID',
        },
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      paymentMethod: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      paymentDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      expirationDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      classno: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ClassRoom',
          key: 'classno',
        },
      },
      Paymentfrequency :          //결제빈도
      {
        type: Sequelize.INTEGER,
        allowNull: true 
      },
      paymentStatus: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Pending',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PaymentHistories');
  },
};
