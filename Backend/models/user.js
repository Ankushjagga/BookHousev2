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
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
 
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    PhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    role :{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue : "user"
    },
    messages :{
      type: DataTypes.JSON,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};