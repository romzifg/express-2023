'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.ProductImage, { foreignKey: 'product_id', as: 'product_thumbnail' })
      Product.hasOne(models.ProductStock, { foreignKey: 'product_id', as: 'product_stock' })
    }
  }
  Product.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'name has been used'
      },
      validate: {
        notNull: {
          msg: 'name cannot be empty'
        }
      }
    },
    description: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'price cannot be empty'
        }
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'category id cannot be empty'
        },
        isExist(value) {
          return sequelize.models.Category.findByPk(value).then((el) => {
            if (!el) {
              throw new Error("Category not found")
            }
          })
        },
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'image cannot be empty'
        }
      },
    },
    countReview: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};