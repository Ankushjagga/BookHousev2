'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CartItem.belongsTo(models.Cart, { foreignKey: 'cart_id' });
      CartItem.belongsTo(models.Product, { foreignKey: 'product_id' });
    }
  }
  CartItem.init({
    cart_id:{ type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, },
    product_id: { type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, },
    quantity: DataTypes.INTEGER,
    added_at: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'CartItem',
    tableName: 'cartitems',
  });
  return CartItem;
};