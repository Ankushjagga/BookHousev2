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
      // define association here
      Product.hasMany(models.OrderDetail, { foreignKey: 'product_id' });
      Product.hasMany(models.ProductReview, { foreignKey: 'product_id' });
      Product.hasMany(models.CartItem, { foreignKey: 'product_id' });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    category: DataTypes.STRING,
    image: DataTypes.TEXT,
    features : {
      type :  DataTypes.TEXT ,
      defaultValue : []
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};