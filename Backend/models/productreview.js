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
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    product_id: DataTypes.UUID,
    user_id: DataTypes.UUID,
    rating: DataTypes.TEXT,
    review_text: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ProductReview',
    tableName: 'productreviews',
  });
  return ProductReview;
};