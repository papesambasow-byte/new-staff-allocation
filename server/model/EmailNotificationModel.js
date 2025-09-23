const {Sequelize} = require("sequelize")
const db = require("../DatabaseConfig/Database.js")
const {DataTypes} = Sequelize

const Recipients = db.define('recipientsTB', {
    recipientEmail:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    RecieverName:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    Active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        validate: {
          notEmpty: true,
        },
      },
      Deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
          notEmpty: true,
        },
      },
      CreatedBy: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      UpdatedBy: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      DeletedBy: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      DateCreated: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        validate: {
          notEmpty: true,
        },
      },
      DateUpdated: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      DateDeleted: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },

},{
    freezeTableName: true,
    timestamps: false,
})

module.exports = Recipients