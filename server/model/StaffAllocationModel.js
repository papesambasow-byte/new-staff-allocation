const { Sequelize } = require("sequelize");
const db = require("../DatabaseConfig/Database.js");
const { DataTypes } = Sequelize;

const Staff = db.define(
  "dbteststaffaloocation",
  {
    NAMES: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    DEPARTMENT: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    ENTITY: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    MSISDN: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    LEVEL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    VOICE: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    DATA: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    SMS: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    DATE_ADDED: {
      type: DataTypes.DATE, 
      allowNull: false,
      defaultValue: Sequelize.NOW, 
    },
  },
  {
    freezeTableName: true,
    timestamps: false, 
  }
);

module.exports = Staff;
