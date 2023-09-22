'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Coupon.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'coupon name has been used'
      },
      validate: {
        notNull: {
          msg: 'coupon name cannot empty'
        }
      }
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'coupon code has been used'
      },
      validate: {
        notNull: {
          msg: 'coupon code cannot empty'
        }
      }
    },
    expired_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'coupon expired date cannot empty'
        }
      }
    },
    disc_value: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'coupon discon value cannot empty'
        }
      }
    },
    coupon: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Coupon',
  });
  return Coupon;
};