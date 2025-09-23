const { Sequelize } = require ("sequelize");
const User = require ("./UserModel.js");
const db = require ("../DatabaseConfig/Database.js");

const {DataTypes} = Sequelize


const AuditTrail = db.define('auditTrail', {
    actor:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }

    },
    action:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }

    },
    performedDate:{
        type: DataTypes.STRING,
        allowNull:false,

    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
},{
    freezeTableName:true
})
User.hasMany(AuditTrail);
AuditTrail.belongsTo(User, { foreignKey: 'userId' });
module.exports= AuditTrail;