const { Sequelize } =require ("sequelize");
const db =require ('../DatabaseConfig/Database.js')
const {DataTypes} = Sequelize;

const Retrive = db.define('staff_allocation_levelTB',  {
    LEVEL:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            
        },
    },
    VOICE:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
        },
    },
    DATA:{
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
    }
},{
    freezeTableName: true,
    timestamps:false
})

module.exports= Retrive;