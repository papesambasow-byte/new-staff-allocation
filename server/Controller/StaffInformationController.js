const Information = require("../model/StaffInformationModel.js");
const Retrive = require("../model/RetrievModel.js");

// Get all staff information
const getAllStaffInformation = async (req, res) => {
  try {
    let response;
    response = await Information.findAll({
      attributes: [
        "id",
        "NAMES",
        "DEPARTMENT",
        "ENTITY",
        "MSISDN",
        "staffAllocationLevelTBId",
      ],
      order :[
        ["id", "DESC"]
      ],
      include: [
        {
          model: Retrive,
          attributes: ["id", "LEVEL", "VOICE", "DATA", "SMS"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get all total sum of VOICE
const getAllStaffInformationSumOfVoice = async (req, res) => {
  try {
    const response = await Information.findAll({
      attributes: [
        "id",
        "NAMES",
        "DEPARTMENT",
        "ENTITY",
        "MSISDN",
        "staffAllocationLevelTBId",
      ],
      include: [
        {
          model: Retrive,
          attributes: ["id", "LEVEL", "VOICE", "DATA", "SMS"],
        },
      ],
    });

    let totalVoiceAllocated = 0;

    response.forEach((item) => {
      if (
        item.staff_allocation_levelTB &&
        item.staff_allocation_levelTB.VOICE
      ) {
        totalVoiceAllocated += item.staff_allocation_levelTB.VOICE;
      }
    });

    res.status(200).json({ totalVoiceAllocated });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get all total sum of DATA
const getAllStaffInformationSumOfData = async (req, res) => {
  try {
    const response = await Information.findAll({
      attributes: [
        "id",
        "NAMES",
        "DEPARTMENT",
        "ENTITY",
        "MSISDN",
        "staffAllocationLevelTBId",
      ],
      include: [
        {
          model: Retrive,
          attributes: ["id", "LEVEL", "VOICE", "DATA", "SMS"],
        },
      ],
    });

    let totalDataAllocated = 0;

    response.forEach((item) => {
      if (item.staff_allocation_levelTB && item.staff_allocation_levelTB.DATA) {
        totalDataAllocated += item.staff_allocation_levelTB.DATA;
      }
    });

    res.status(200).json({ totalDataAllocated });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get all total sum of SMS
const getAllStaffInformationSumOfSms = async (req, res) => {
  try {
    const response = await Information.findAll({
      attributes: [
        "id",
        "NAMES",
        "DEPARTMENT",
        "ENTITY",
        "MSISDN",
        "staffAllocationLevelTBId",
      ],
      include: [
        {
          model: Retrive,
          attributes: ["id", "LEVEL", "VOICE", "DATA", "SMS"],
        },
      ],
    });

    let totalSmsAllocated = 0;

    response.forEach((item) => {
      if (item.staff_allocation_levelTB && item.staff_allocation_levelTB.SMS) {
        totalSmsAllocated += item.staff_allocation_levelTB.SMS;
      }
    });

    res.status(200).json({ totalSmsAllocated });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getStaffInformationById = async (req, res) => {
  try {
    const staffInformation = await Information.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!staffInformation)
      return res.status(404).json({ msg: "Data Not Found" });
    let response;
    response = await Information.findOne({
      attributes: [
        "id",
        "NAMES",
        "DEPARTMENT",
        "ENTITY",
        "MSISDN",
        "staffAllocationLevelTBId",
      ],
      where: {
        id: staffInformation.id,
      },
      include: [
        {
          model: Retrive,
          attributes: ["id", "LEVEL", "VOICE", "DATA", "SMS"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// update staff information
// const updateStaffInformation = async (req, res) => {
//   try {
//     const staffInformation = await Information.findOne({
//       where: {
//         id: req.params.id,
//       },
//     });

//     if (!staffInformation)
//       return res.status(404).json({ msg: "No employee Found" });

//     const { id, NAMES, DEPARTMENT, ENTITY, MSISDN, staffAllocationLevelTBId } =
//       req.body;
//     // Remove "+232" and "0" from the MSISDN, if present.
//     const cleanedMSISDN = MSISDN.replace("+232", "").replace("0", "");
//     const msisdnPattern = /^\d{8}$/;

//     if (!msisdnPattern.test(cleanedMSISDN)) {
//       res
//         .status(400)
//         .json({
//           error:
//             "Invalid MSISDN field you must input the correct MSISDN which is: 79111111 ",
//         });
//       return;
//     }

//     await Information.update(
//       { id, NAMES, DEPARTMENT, ENTITY, MSISDN, staffAllocationLevelTBId },
//       {
//         where: {
//           id: staffInformation.id,
//         },
//       }
//     );
//     res.status(200).json({ msg: "Your child sign off is successfully" });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

const updateStaffInformation = async (req, res) => {
  try {
    const staffInformation = await Information.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!staffInformation) {
      return res.status(404).json({ msg: "No employee Found" });
    }

    const { id, NAMES, DEPARTMENT, ENTITY, MSISDN, staffAllocationLevelTBId } =
      req.body;
    
    // Check for duplicate MSISDN
    const existingStaff = await Information.findOne({
      where: {
        MSISDN: MSISDN,
      },
    });

    if (existingStaff && existingStaff.id !== staffInformation.id) {
      return res.status(400).json({ error: "Duplicate MSISDN found" });
    }

    // Remove "+232" and "0" from the MSISDN, if present.
    const cleanedMSISDN = MSISDN.replace("+232", "").replace("0", "");
    const msisdnPattern = /^\d{8}$/;

    if (!msisdnPattern.test(cleanedMSISDN)) {
      return res.status(400).json({
        msg: "Invalid MSISDN field. You must input a correct MSISDN which is: 79111111",
      });
    }

    await Information.update(
      { id, NAMES, DEPARTMENT, ENTITY, MSISDN, staffAllocationLevelTBId },
      {
        where: {
          id: staffInformation.id,
        },
      }
    );

    res.status(200).json({ msg: "Your child sign off is successful" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// create staff information
const createStaffInformation = async (req, res) => {
  const { NAMES, DEPARTMENT, ENTITY, MSISDN, staffAllocationLevelTBId } =
    req.body;

  // Remove "+232" and "0" from the MSISDN, if present.
  const cleanedMSISDN = MSISDN.replace("+232", "").replace("0", "");
  const msisdnPattern = /^\d{8}$/;

  if (!msisdnPattern.test(cleanedMSISDN)) {
    return res.status(400).json({
      error: "Invalid MSISDN field. You must input the correct MSISDN which is: 79111111",
    });
  }

  try {
    // Check for duplicate MSISDN
    const existingStaff = await Information.findOne({
      where: {
        MSISDN: cleanedMSISDN,
      },
    });

    if (existingStaff) {
      return res.status(400).json({ msg:"MSISDN is a duplicate therefore it cannot be save" });
    }

    // If no duplicate is found, create the new record
    await Information.create({
      NAMES: NAMES,
      DEPARTMENT: DEPARTMENT,
      ENTITY: ENTITY,
      MSISDN: cleanedMSISDN, // Use the cleaned MSISDN value
      staffAllocationLevelTBId: staffAllocationLevelTBId,
    });
    res.status(201).json({ msg: "Staff allocated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};


// Delete staff information by individual
const deleteStaffInformation = async (req, res) => {
  try {
    const staffInformation = await Information.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!staffInformation)
      return res.status(404).json({ msg: "Data not found" });

    await Information.destroy({
      where: {
        id: staffInformation.id,
      },
    });

    res.status(200).json({ msg: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


module.exports = {
  getAllStaffInformation,
  getStaffInformationById,
  updateStaffInformation,
  createStaffInformation,
  deleteStaffInformation,
  getAllStaffInformationSumOfVoice,
  getAllStaffInformationSumOfSms,
  getAllStaffInformationSumOfData,
};
