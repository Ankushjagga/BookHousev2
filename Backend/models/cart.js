'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, { foreignKey: 'user_id' });
      Cart.hasMany(models.CartItem, { foreignKey: 'cart_id' });
    }
  }
  Cart.init({
    user_id:    { type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Cart',
    tableName: 'carts',
  });
  return Cart;
};