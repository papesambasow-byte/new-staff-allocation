const Department = require ("../model/DepartmentModel.js")
const Sequelize = require('sequelize');
// Now you can use Sequelize in your code



// Get all staff information
const getDepartment = async (req, res) => {
  try {
    let response;
    response = await Department.findAll({
      // attributes: ["id", "deptName"],
      where :{
        Active: true,
        Deleted: false,
      },
      order : [
        ["id", "DESC"],
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};



// get inactive users
const getInActiveDepartment = async (req, res) => {
  try {
    const response = await Department.findAll({
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
const ActivateDepartment = async (req, res) => {
  try {
    // Find the user by ID and ensure they are deleted and not active
    const user = await Department.findOne({
      where: {
        id: req.params.id,
        Active: false,
        Deleted: true,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "Department not found or not eligible for reactivation" });
    }

    // Update the user to mark them as active and not deleted
    await Department.update(
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

    res.status(200).json({ msg: "Department Reactivated" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const dept = await Department.findOne({
      where: {
        id: req.params.id,
        Active: true,
        Deleted: false,
      },
    });
    if (!dept) return res.status(404).json({ msg: "Data Not Found" });
    let response;
    response = await Department.findOne({
        // attributes: ["id", "deptName"],
      where: {
        id: dept.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// update staff information
const updateDepartment= async (req, res) => {
  try {
    const dept = await Department.findOne({
      where: {
        id: req.params.id,
        Active: true,
        Deleted: false,
      },
    });

    if (!dept) return res.status(404).json({ msg: "No Department Found" });

    const { id, deptName,UpdatedBy } = req.body;
    

    await Department.update(
      { id,
        deptName,
        UpdatedBy:UpdatedBy,
        DateUpdated: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      {
        where: {
          id: dept.id,
        },
      }
    );
    res.status(200).json({ msg: "Department is successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// create staff information
const createDepartment = async (req, res) => {
  const { deptName,CreatedBy } = req.body;
  try {
    await Department.create({
        deptName: deptName,
        CreatedBy:CreatedBy,
    });
    res.status(201).json({ msg: "Department is Successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// Delete staff information by individual
// const deleteDepartment = async (req, res) => {
//   try {
//     const dept = await Department.findOne({
//       where: {
//         id: req.params.id,
//       },
//     });

//     if (!dept) return res.status(404).json({ msg: "email not found" });

//     await Department.destroy({
//       where: {
//         id: dept.id,
//       },
//     });

//     res.status(200).json({ msg: "Deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

const deleteDepartment = async (req, res) => {
  try {
    // Find the user by ID and ensure they are active and not deleted
    const dept = await Department.findOne({
      where: {
        id: req.params.id,
        Active: true,
        Deleted: false,
      },
    });

    if (!dept) {
      return res.status(404).json({ msg: "Department not found" });
    }

    // Update the user to mark them as deleted
    await Department.update(
      {
        Active: false,
        Deleted: true,
        DateDeleted: new Date(),
      },
      {
        where: {
          id: dept.id,
        },
      }
    );

    res.status(200).json({ msg: "Department Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  getDepartment,
  getDepartmentById,
  updateDepartment,
  createDepartment,
  deleteDepartment,
  ActivateDepartment,
  getInActiveDepartment
};
