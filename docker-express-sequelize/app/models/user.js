"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      user_name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "名前は必ず入力してください。",
          },
        },
      },
      age: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "年齢は必ず入力してください。",
          },
          isInt: {
            msg: "年齢は整数値で入力してください。",
          },
          min: {
            msg: "年齢は0歳以上で入力してください。",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
    }
  );
  return user;
};
