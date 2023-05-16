'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProfitRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ProfitRequest.init({
    userId: DataTypes.BIGINT,
    amount: DataTypes.DECIMAL(36, 2),
    serviceTitle: DataTypes.STRING,
    currency: DataTypes.STRING,
    requisites: DataTypes.TEXT,
    screenshot: DataTypes.TEXT,
    status: DataTypes.TINYINT
  }, {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    sequelize,
    modelName: 'ProfitRequest',
  });
  return ProfitRequest;
};