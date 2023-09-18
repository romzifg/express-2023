'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TransactionItem.hasOne(models.Product, { foreignKey: 'id', as: 'product' })
    }
  }
  TransactionItem.init({
    transaction_item_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    transaction_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    total: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      allowNull: false
    },
    total_amount: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TransactionItem',
  });
  return TransactionItem;
};