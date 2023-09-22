'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      transaction_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      transaction_date: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      total_item: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      coupon_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'coupons',
          key: 'id'
        },
      },
      total_amount: {
        allowNull: false,
        type: Sequelize.DOUBLE,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'WAITING'
      },
      attachment_transaction: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};