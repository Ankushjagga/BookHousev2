'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
  
        User.hasMany(models.Order, { foreignKey: 'user_id' });
        User.hasMany(models.ProductReview, { foreignKey: 'user_id' });
        User.hasOne(models.Cart, { foreignKey: 'user_id' });
    


    }
  }
  User.init({
    
    confirmPassword: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    PhoneNumber: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};