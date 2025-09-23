const { Sequelize } = require("sequelize");
const db = require("../DatabaseConfig/Database.js");
const Retrive = require("./RetrievModel.js");
const { DataTypes } = Sequelize;

const Information = db.define(
  "staffInformationTB",
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
        notEmpty: false,
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
    staffAllocationLevelTBId: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Retrive.hasMany(Information);
Information.belongsTo(Retrive, { foreignKey: "staffAllocationLevelTBId" });
module.exports = Information;
