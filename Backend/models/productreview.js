'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductReview.belongsTo(models.Product, { foreignKey: 'product_id' });
      ProductReview.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  ProductReview.init({
    product_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    review_text: DataTypes.TEXT,
    review_date: DataTypes.DATE,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ProductReview',
  });
  return ProductReview;
};