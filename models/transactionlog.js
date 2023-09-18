'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TransactionLog.hasOne(models.Transaction, { foreignKey: "transaction_id", as: 'transaction' })
    }
  }
  TransactionLog.init({
    transaction_log_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    transaction_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'TransactionLog',
  });
  return TransactionLog;
};