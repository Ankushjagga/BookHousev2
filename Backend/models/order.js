'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: 'user_id' });
      Order.hasMany(models.OrderDetail, { foreignKey: 'order_id' });
    }
  }
  Order.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_id: DataTypes.UUID,
    payment_status: DataTypes.TEXT,
    shipping_address: DataTypes.JSON ,
    total_amount : DataTypes.TEXT,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};