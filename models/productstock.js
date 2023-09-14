'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductStock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductStock.belongsTo(models.Product, { foreignKey: 'id', as: 'product' })
    }
  }
  ProductStock.init({
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'product id cannot be empty'
        },
        isExist(value) {
          return sequelize.models.Product.findByPk(value).then((el) => {
            if (!el) {
              throw new Error("Product not found")
            }
          })
        },
      },
      defaultValue: 0
    },
    current_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'current stock cannot be empty'
        }
      },
      defaultValue: 0
    },
    old_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'old stock cannot be empty'
        }
      },
      defaultValue: 0
    },
    diff_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'diff stock cannot be empty'
        }
      },
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'ProductStock',
  });
  return ProductStock;
};