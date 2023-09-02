'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) { }
  }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'category name has been used'
      },
      validate: {
        notNull: {
          msg: 'category name cannot empty'
        }
      }
    },
    description: DataTypes.TEXT
  }, {
    hooks: {
      beforeValidate: (category, options) => {
        category.name = category.name.toLowerCase()
      }
    },
    sequelize,
    modelName: 'Category',
  });
  return Category;
};