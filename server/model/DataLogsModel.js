const { Sequelize } =require ("sequelize");
const db =require ('../DatabaseConfig/Database.js')
const {DataTypes} = Sequelize;

const Data = db.define('staff_entitlement_logs_data',  {
    MSISDN:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
        },
    },
    NORMAL_DATA_in_GB:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            
        },
    },
    FLOAT_DATA_in_GB:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
        },
    },
    SMS:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
           
        },
    },
    DATE_AWARDED:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
           
        },
    },
},{
    freezeTableName: true,
    timestamps: false, 
})

module.exports= Data;