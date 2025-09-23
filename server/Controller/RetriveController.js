const Retrive = require("../model/RetrievModel.js");
const { Op } =require ("sequelize");


// Get all the data
const getAllRetrive = async(req, res) =>{
  try{
     const response = await Retrive.findAll({
      attributes:["id","LEVEL", "VOICE", "DATA", "SMS"],
      order :[
        ["id", "DESC"]
      ]
     })
     res.status(200).json(response)
  }catch(error){
      res.status(500).json({msg:error.message})
  }
}


// Get by one in the form of ID
// const getRetriveById = async (req, res) => {
//   try {
//       const staff_allocation_levelTB = await Retrive.findOne({
//           where: {
//               id: req.params.id
//           },
//       });
//       if (!staff_allocation_levelTB) return res.status(404).json({ msg: "Data Not Found" });
//       let response;
//           response = await Register.findOne({
//             attributes:["id","LEVEL", "VOICE", "DATA", "SMS"],
//               where: {
//                   id: staff_allocation_levelTB.id
//               },
//           });
//       res.status(200).json(response);
//   } catch (error) {
//       res.status(500).json({ msg: error.message });
//   }
// }

const getRetriveById = async (req, res) => {
    try {
      const retriving = await Retrive.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!retriving)
        return res.status(404).json({ msg: "Data Not Found" });
      let response;
      response = await Retrive.findOne({
        attributes:["id","LEVEL", "VOICE", "DATA", "SMS"],
        where: {
          id: retriving.id,
        },
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };


// Edit individual via by ID
const updateRetrive  = async (req, res) => {
  try {
      const staff_allocation_levelTB = await Retrive.findOne({
          where: {
              id: req.params.id
          }
      });

      if (!staff_allocation_levelTB) return res.status(404).json({ msg: "No employee Found" });

      const { id, LEVEL, VOICE, DATA, SMS} = req.body;
     
          await Retrive.update({ LEVEL, VOICE, DATA, SMS}, {
              where: {
                  id:staff_allocation_levelTB.id
              }
          });
      res.status(200).json({ msg: "Your child sign off is successfully" });
  } catch (error) {
      res.status(500).json({ msg: error.message });
  }
}


// Create new info
const createRetrive  = async (req, res) => {
    const { LEVEL, VOICE, DATA, SMS } = req.body;
  
    try {
      await Retrive.create({ 
        LEVEL:LEVEL, 
        VOICE:VOICE, 
        DATA:DATA,
        SMS:SMS,
      });
      res.status(201).json({ msg: 'Staff allocated Successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: error.message });
    }
  };


// Delete individual info

const deleteRetrive = async (req, res) => {
    try {
      const retriving = await Retrive.findOne({
        where: {
          id: req.params.id,
        },
      });
  
      if (!retriving)
        return res.status(404).json({ msg: "Data not found" });
  
      await Retrive.destroy({
        where: {
          id: retriving.id,
        },
      });
  
      res.status(200).json({ msg: "Deleted successfully" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
  

module.exports ={
    getAllRetrive,
    getRetriveById,
    updateRetrive,
    createRetrive,
    deleteRetrive,
   
}




