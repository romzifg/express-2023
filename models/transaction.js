'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.hasMany(models.TransactionItem, { foreignKey: 'transaction_id', as: 'items' })
      Transaction.hasMany(models.TransactionLog, { foreignKey: 'transaction_id', as: 'logs' })
      Transaction.hasMany(models.Coupon, { foreignKey: 'coupon_id', as: 'coupon' })
    }
  }
  Transaction.init({
    transaction_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    transaction_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    total_item: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    coupon_id: {
      type: DataTypes.INTEGER,
    },
    total_amount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'WAITING'
    },
    attachment_transaction: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};