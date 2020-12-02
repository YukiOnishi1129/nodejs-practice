'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      // バリデーション処理追加
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: '名前は必ず入力してください。',
          },
        },
      },
      pass: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'パスワードは必ず入力してください。',
          },
        },
      },
      mail: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: 'メールアドレスを入力下さい。',
          },
        },
      },
      age: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: { msg: '整数を入力下さい。' },
          min: {
            args: [0],
            msg: 'ゼロ以上の値が必要です。',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
