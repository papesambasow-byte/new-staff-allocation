const Staff = require("../model/StaffAllocationModel.js")
const { Op } =require ("sequelize");



const getAllStaffAllocation = async(req, res) =>{
  try{
     const response = await Staff.findAll({
      attributes:['id', 'NAMES', 'DEPARTMENT', 'ENTITY', 'MSISDN', "LEVEL", "VOICE", "DATA", "SMS", "DATE_ADDED" ],
      order: [["DATE_ADDED", "DESC"]],
     })
     res.status(200).json(response)
  }catch(error){
      res.status(500).json({msg:error.message})
  }
}



 const getStaffAllocationById = async (req, res) => {
  try {
      const staffEntitlement_tb = await Staff.findOne({
          where: {
              id: req.params.id
          },
      });
      if (!staffEntitlement_tb) return res.status(404).json({ msg: "Data Not Found" });
      let response;
          response = await Staff.findOne({
            attributes:['id', 'NAMES', 'DEPARTMENT', 'ENTITY', 'MSISDN', "LEVEL", "VOICE", "DATA", "SMS", "DATE_ADDED"],
              where: {
                  id: staffEntitlement_tb.id
              },
          });
      res.status(200).json(response);
  } catch (error) {
      res.status(500).json({ msg: error.message });
  }
}


const updateStaffAllocation = async (req, res) => {
  try {
      const staffEntitlement_tb = await Staff.findOne({
          where: {
              id: req.params.id
          }
      });

      if (!staffEntitlement_tb) return res.status(404).json({ msg: "No employee Found" });

      const { id,NAMES, DEPARTMENT, ENTITY, MSISDN, LEVEL, VOICE, DATA, SMS} = req.body;

      const MSISDNNumber = parseInt(MSISDN, 11); 
      if (isNaN(MSISDNNumber) || MSISDNNumber.toString().startsWith("0")) {
        res.status(400).json({ error: "Invalid MSISDN field" });
        return;
      }
  
     
          await Staff.update({id,NAMES, DEPARTMENT, ENTITY, MSISDN, LEVEL, VOICE, DATA, SMS}, {
              where: {
                  id:staffEntitlement_tb.id
              }
          });
      res.status(200).json({ msg: "Your child sign off is successfully" });
  } catch (error) {
      res.status(500).json({ msg: error.message });
  }
}


 const createStaffAllocation = async (req, res) => {

    const {NAMES, DEPARTMENT, ENTITY, MSISDN, LEVEL, VOICE, DATA, SMS } = req.body;

    const MSISDNNumber = parseInt(MSISDN, 8); 
    if (isNaN(MSISDNNumber) || MSISDNNumber.toString().startsWith("0")) {
      res.status(400).json({ error: "Invalid MSISDN field" });
      return;
    }
  
    try {
      await Staff.create({ 
        NAMES:NAMES,
        DEPARTMENT:DEPARTMENT,
        ENTITY:ENTITY,
        MSISDN:MSISDN, 
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
  


const deleteStaffAllocation = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the URL
    const { ids } = req.body; // Get the array of IDs from the request body

    if (id === 'all') {
      // Case 3: Deleting all records
      await Staff.destroy({
        where: {},
        truncate: true
      });

      return res.status(200).json({ msg: "All records deleted successfully" });
    } else if (Array.isArray(ids) && ids.length > 0) {
      // Case 2: Deleting multiple records using IDs from request body
      await Staff.destroy({
        where: {
          id: ids
        }
      });

      return res.status(200).json({ msg: "Selected records deleted successfully" });
    } else {
      // Case 1: Single deletion using URL parameter
      const allocation = await Staff.findOne({
        where: {
          id: id
        }
      });
      
      if (!allocation) return res.status(404).json({ msg: "Data not found" });
      
      await allocation.destroy();
      
      return res.status(200).json({ msg: "Deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}



// GRAPHS
const getMonthlyVoiceSumss = async (req, res) => {
  try {
    const levels = [
      'eXLEmployee',
      'Officer',
      'SeniorOfficer',
      'AssistantManager',
      'Manager',
      'SeniorManager',
      'DeputyDirector',
      'Director'
    ];

    const promises = levels.map(level =>
      Staff.sequelize.query(
        `
        SELECT :level AS LEVEL, COUNT(*) AS POSITION, SUM(VOICE) AS VOICE, SUM(DATA) AS DATA, SUM(SMS) AS SMS
        FROM staffAllcoationDB.staffEntitlement_tb
        WHERE LEVEL = :level
        `,
        {
          replacements: { level },
          type: Staff.sequelize.QueryTypes.SELECT
        }
      )
    );

    const results = await Promise.all(promises);

    // Flatten the array of results
    const response = results.flat();

    // Log the response for debugging
    console.log('Response:', response);

    res.status(200).json({ departments: response });
  } catch (error) {
    console.error('Error:', error); // Log the error
    res.status(500).json({ msg: error.message });
  }
};



const getDepartmentData = async (req, res) => {
  try {
    const levels = [
      { name: 'Foundation', alias: 'FOU' },
      { name: 'Network', alias: 'NET' },
      { name: 'Commercial', alias: 'COM' },
      { name: 'Transformation & Strategy', alias: 'TS' },
      { name: 'Human Resources', alias: 'HR' },
      { name: 'Marketing', alias: 'MKT' },
      { name: 'GS', alias: 'GS' },
      { name: 'IT', alias: 'IT' },
      { name: 'Governance, Internal Control & Audit', alias: 'GICA' },
      { name: 'Procurement & Logistics', alias: 'PLD' },
      { name: 'Customer Experience', alias: 'CX' },
      { name: 'Finance', alias: 'FIN' },
      { name: 'Wholesale & Roaming', alias: 'WR' },
      { name: 'Program', alias: 'PRO' },
      { name: 'Orange Money', alias: 'OM' },
      { name: 'Commercial(B2C)', alias: 'B2C' },
      { name: 'HR Creche assistant', alias: 'HR Creche' }
    ];

    const promises = levels.map(level =>
      Staff.sequelize.query(
        `
        SELECT :alias AS DEPARTMENT, COUNT(*) AS STAFF, SUM(VOICE) AS VOICE, SUM(DATA) AS DATA, SUM(SMS) AS SMS
        FROM staffAllcoationDB.staffEntitlement_tb
        WHERE DEPARTMENT = :name
        `,
        {
          replacements: { name: level.name, alias: level.alias },
          type: Staff.sequelize.QueryTypes.SELECT
        }
      )
    );

    const results = await Promise.all(promises);

    // Flatten the array of results
    const response = results.flat();

    // Log the response for debugging
    console.log('Response:', response);

    res.status(200).json({ departments: response });
  } catch (error) {
    console.error('Error:', error); // Log the error
    res.status(500).json({ msg: error.message });
  }
};



const getAllStaffSumOfVoice = async (req, res) => {
  try {
    const response = await Staff.findAll({
      attributes: ['VOICE', ],
    });

    // Calculate total VOICE
    let totalVoiceAllocated = 0;
    response.forEach((item) => {
      if (item.VOICE) {
        totalVoiceAllocated += item.VOICE;
      }
    });

    // Send both the response and the total VOICE
    res.status(200).json({ totalVoiceAllocated});
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};



// Get all total sum of DATA
const getAllStaffSumOfData = async (req, res) => {
  try {
    const response = await Staff.findAll({
      attributes: ['DATA'],
    });

    // Calculate total DATA
    let totalDataAllocated = 0;
    response.forEach((item) => {
      if (item.DATA) {
        totalDataAllocated += item.DATA;
      }
    });

    // Send only the total DATA
    res.status(200).json({ totalDataAllocated });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};



// Get all total sum of SMS

const getAllStaffSumOfSms = async (req, res) => {
  try {
    const response = await Staff.findAll({
      attributes: ['SMS'],
    });

    // Calculate total SMS
    let totalSmsAllocated = 0;
    response.forEach((item) => {
      if (item.SMS) {
        totalSmsAllocated += item.SMS;
      }
    });

    // Send only the total SMS
    res.status(200).json({ totalSmsAllocated });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};










module.exports ={
    getAllStaffAllocation,
    getStaffAllocationById,
    updateStaffAllocation,
    createStaffAllocation,
    deleteStaffAllocation,
    getMonthlyVoiceSumss,
    getDepartmentData,
    getAllStaffSumOfVoice,
    getAllStaffSumOfData,
    getAllStaffSumOfSms,
}




