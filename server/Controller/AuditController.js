const AuditTrail = require ( "../model/AuditTrails.js");
const User = require ("../model/UserModel.js");
const { Op } = require ("sequelize");


const getAuditTrail = async(req,res) =>{
    try{
      let response;
     
        response = await AuditTrail.findAll({
            attributes:["id", "actor", "action", "performedDate"],
            order: [["createdAt", "DESC"]],
            include: [
              {
                model: User,
                attributes: [ "id", "userName", "userPhone","userEmail", "role"],
              },
            ],
            
        })
      res.status(200).json(response)
    }catch(error){
        res.status(500).json({msg:error.message})
    }
}

const getAuditPerDay = async(req,res) =>{
    try{
        const today = new Date(); 
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0 ); 
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999); 
        let response
      response = await AuditTrail.findAll({
        attributes:["id", "actor", "action", "performedDate"],
    where: {
      updatedAt: {
        [Op.between]: [startOfDay, endOfDay],
      },
    },
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: User,
        attributes: [ "id","userName", "userPhone", "userEmail", "role", ],
      },
     ],
    }); 
res.status(200).json(response)
}catch(error){
    res.status(500).json({msg:error.message})
}
}

const getAuditTrailById = async(req,res) =>{
   try{
    const auditTrail = await AuditTrail.findOne({
        where:{
            id:req.params.id
        }
    })
    if(!auditTrail) return res.status(404).json({msg:"Data Not Found"})
    let response;
        response = await AuditTrail.findOne({
            attributes:["id", "actor", "action", "performedDate"],
            where:{
                id:auditTrail.id
            },
            order: [
                ['createdAt', 'DESC'],
            ],
            include: [{
                model: User,
                attributes: ['id',  "userName", "userPhone", "userEmail", "role"]
            }]
        })
    res.status(200).json(response)
   }catch(error){
    res.status(500).json({ msg: error.message });
   }
}

const createAuditTrail = async(req,res) =>{
  const{actor, action, performedDate}=req.body
  try{
      await AuditTrail.create({
          actor:actor,
          action:action,
          performedDate:performedDate,

          userId: req.userId
      })
      res.status(200).json({msg:"Request Created Successfully"})
  }catch(error){
      res.status(404).json({msg:error.message})
  }
}



module.exports={
  createAuditTrail,
  getAuditPerDay,
  getAuditTrailById,
  getAuditTrail,
}
