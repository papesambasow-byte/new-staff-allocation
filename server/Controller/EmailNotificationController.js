const Recipients = require("../model/EmailNotificationModel.js");
const Sequelize = require('sequelize');
// const User = require("../model/UserModel.js");

// Get all staff information
const getEmailNotification = async (req, res) => {
  try {
    let response;
    response = await Recipients.findAll({
      // attributes: ["id", "recipientEmail", "RecieverName"],
      where: {
        Active: true,
        Deleted: false,
      },
      order: [["id", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// get inactive email
const getInActiveEmail = async (req, res) => {
  try {
    const response = await Recipients.findAll({
    //   attributes: ["id", "userName", "userPhone", "userEmail", "role"],
      where:{
        Active: false,
        Deleted: true,
      },
      order: [["id", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};



//   activate users
const ActivateEmail = async (req, res) => {
  try {
    // Find the user by ID and ensure they are deleted and not active
    const user = await Recipients.findOne({
      where: {
        id: req.params.id,
        Active: false,
        Deleted: true,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "email not found or not eligible for reactivation" });
    }

    // Update the user to mark them as active and not deleted
    await Recipients.update(
      {
        Active: true,
        Deleted: false,
        DateDeleted: null, // Reset DateDeleted to null
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    res.status(200).json({ msg: "email Reactivated" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getEmailNotificationById = async (req, res) => {
  try {
    const emailNotice = await Recipients.findOne({
      where: {
        id: req.params.id,
        Active: true,
        Deleted: false,
      },
    });
    if (!emailNotice) return res.status(404).json({ msg: "Data Not Found" });
    let response;
    response = await Recipients.findOne({
      // attributes: ["id", "recipientEmail", "RecieverName"],
      where: {
        id: emailNotice.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// const getEmailNotificationById = async (req, res) => {
//   try {
//     const emailNotice = await Recipients.findOne({
//     //   attributes: ["id", "userName", "userPhone", "userEmail", "role"],
//       where: {
//         id: req.params.id,
//         Active: true,
//         Deleted: false,
//       },
//     });

//     if (!emailNotice) {
//         return res.status(404).json({ msg: "User not found" });
//       }

//     res.status(200).json(response);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

// update staff information

const updateEmailNotification = async (req, res) => {
  try {
    const emailNotice = await Recipients.findOne({
      where: {
        id: req.params.id,
        Active: true,
        Deleted: false,
      },
    });

    if (!emailNotice) return res.status(404).json({ msg: "No email Found" });

    const { id, recipientEmail, RecieverName,UpdatedBy } = req.body;


    await Recipients.update(
      {
        id,
        recipientEmail,
        RecieverName,
        UpdatedBy: UpdatedBy,
        DateUpdated: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      {
        where: {
          id: emailNotice.id,
        },
      }
    );
    res.status(200).json({ msg: "email is successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// create staff information
const createEmailNotification = async (req, res) => {
  const { recipientEmail, RecieverName, CreatedBy } = req.body;
  try {
    await Recipients.create({
      recipientEmail: recipientEmail,
      RecieverName: RecieverName,
      CreatedBy:CreatedBy
    });
    res.status(201).json({ msg: "email is Successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// Delete staff information by individual
// const deleteEmailNotification = async (req, res) => {
//   try {
//     const emailNotice = await Recipients.findOne({
//       where: {
//         id: req.params.id,
//       },
//     });

//     if (!emailNotice) {
//       return res.status(404).json({ error: "Email not found" });
//     }

//     try {
//       await Recipients.destroy({
//         where: {
//           id: emailNotice.id,
//         },
//       });

//       res.status(200).json({ msg: "Email notification deleted successfully" });
//     } catch (deleteError) {
//       res
//         .status(500)
//         .json({
//           error: "Error deleting email notification",
//           details: deleteError.message,
//         });
//     }
//   } catch (findError) {
//     res
//       .status(500)
//       .json({
//         error: "Error finding email notification",
//         details: findError.message,
//       });
//   }
// };


const deleteEmailNotification = async (req, res) => {
  try {
    // Find the user by ID and ensure they are active and not deleted
    const emailNotice = await Recipients.findOne({
      where: {
        id: req.params.id,
        Active: true,
        Deleted: false,
      },
    });

    if (!emailNotice) {
      return res.status(404).json({ msg: "email not found" });
    }

    // Update the user to mark them as deleted
    await Recipients.update(
      {
        Active: false,
        Deleted: true,
        DateDeleted: new Date(),
      },
      {
        where: {
          id: emailNotice.id,
        },
      }
    );

    res.status(200).json({ msg: "email Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};


module.exports = {
  getEmailNotification,
  getEmailNotificationById,
  updateEmailNotification,
  createEmailNotification,
  deleteEmailNotification,
  getInActiveEmail,
  ActivateEmail
};
