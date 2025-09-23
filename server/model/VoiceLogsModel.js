const { Sequelize } =require ("sequelize");
const db =require ('../DatabaseConfig/Database.js')
const {DataTypes} = Sequelize;

const Voice = db.define('staff_entitlement_logs_voice',  {
    MSISDN:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
        },
    },
    NORMAL_VOICE_in_Leones:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            
        },
    },
    FLOAT_VOICE_in_leones:{
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

module.exports= Voice;