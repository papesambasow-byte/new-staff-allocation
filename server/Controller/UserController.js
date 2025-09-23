const User = require("../model/UserModel.js");
const Sequelize = require('sequelize');
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');

const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      //   attributes: ["id", "userName", "userPhone", "userEmail", "role"],
      where: {
        Active: true,
        Deleted: false,
      },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// get inactive users
const getInActive = async (req, res) => {
  try {
    const response = await User.findAll({
      //   attributes: ["id", "userName", "userPhone", "userEmail", "role"],
      where: {
        Active: false,
        Deleted: true,
      },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};



//   activate users
const ActivateUser = async (req, res) => {
  try {
    // Find the user by ID and ensure they are deleted and not active
    const user = await User.findOne({
      where: {
        id: req.params.id,
        Active: false,
        Deleted: true,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found or not eligible for reactivation" });
    }

    // Update the user to mark them as active and not deleted
    await User.update(
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

    res.status(200).json({ msg: "User Reactivated" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};



const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      //   attributes: ["id", "userName", "userPhone", "userEmail", "role"],
      where: {
        id: req.params.id,
        Active: true,
        Deleted: false,
      },
    });

    if (!response) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// const createUsers = async (req, res) => {
//   const { userName, userPhone, userEmail, userPassword, confPassword, role,CreatedBy } =
//     req.body;

//   // Password validation
//   const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
//   if (!passwordRegex.test(userPassword)) {
//     return res
//       .status(400)
//       .json({
//         msg: "Password must contain at least 8 characters, including uppercase and lowercase letters, numbers, and symbols",
//       });
//   }

//   if (userPassword !== confPassword)
//     return res
//       .status(400)
//       .json({ msg: "Password and Confirm Password do not match" });

//   const hashedPass = bcrypt.hashSync(userPassword, 10);

// //   const createdBy = req.user.userName
//   try {
//     await User.create({
//       userName: userName,
//       userEmail: userEmail,
//       userPhone: userPhone,
//       userPassword: hashedPass,
//       role: role,
//       CreatedBy:CreatedBy,
//     });
//     res.status(201).json({ msg: "Register Successful" });
//   } catch (error) {
//     res.status(400).json({ msg: error.message });
//   }
// };



function generateRandomPassword(length = 12) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
}

const createUser = async (req, res) => {
  const { userName, userPhone, userEmail, role, CreatedBy } = req.body;

  // Generate a random password
  const defaultPassword = generateRandomPassword();

  // Hash the default password
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  try {
    // Save the user to the database
    await User.create({
      userName: userName,
      userEmail: userEmail,
      userPhone: userPhone,
      userPassword: hashedPassword,
      defaultPassword: hashedPassword,
      role: role,
      CreatedBy: CreatedBy,
    });

    // Set up the email transporter
    const transporter = nodemailer.createTransport({
      host: "webmail.orange-sonatel.com",
      port: 25,
      tls: {
        rejectUnauthorized: false,
      },
    });

    const emailText = `
     Hello ${userName},
     
     Your account has been created successfully.<br/><br/>
     
     Your default Password: ${defaultPassword},<br/><br/>
     
     Please click the link below to update your password:
     
     <a href="http://172.25.160.235:2502/updatePassword">Update Password</a><br/><br/>
     
     Please log in and change your password as soon as possible.<br/><br/>
     
     Best regards,<br/>
     Orange SL<br/>
     Staff Allocation
     `;
    // Compose the email
    const mailOptions = {
      from: 'digitalFactoryOSL@orange-sonatel.com',
      to: userEmail,
      subject: 'Your Account Details',
      html: emailText,

    };

    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(201).json({ msg: 'User registration successful. Default password has been sent to the user\'s email.' });

  } catch (error) {
    console.error('Error:', error); // Log error details for debugging
    res.status(500).json({ msg: 'Failed to create user or send email', error: error.message });
  }
};

const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
      Active: true,
      Deleted: false,
    },
  });

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  const { userName, userPhone, userEmail, role, UpdatedBy } =
    req.body;

  // if (userPassword !== confPassword) {
  //   return res
  //     .status(400)
  //     .json({ msg: "Password and Confirm Password do not match" });
  // }

  // if (!userPassword || !confPassword) {
  //   return res
  //     .status(400)
  //     .json({ msg: "Password and Confirm Password are required" });
  // }

  // const passwordRegex =
  //   /^(?=.*[a-zA-Z0-9])(?=.*[$@$!%*?&])[A-Za-z0-9$@$!%*?&]{8,}$/;
  // if (!passwordRegex.test(userPassword)) {
  //   return res
  //     .status(400)
  //     .json({
  //       msg: "Password must contain at least 8 characters, including at least one letter, one number, and one symbol",
  //     });
  // }

  // const isSamePassword = await bcrypt.compare(userPassword, user.userPassword);
  // if (isSamePassword) {
  //   return res
  //     .status(400)
  //     .json({ msg: "New password cannot be the same as the current password" });
  // }

  // let hashedPass;
  // try {
  //   hashedPass = await bcrypt.hash(userPassword, 10);
  // } catch (error) {
  //   return res.status(500).json({ msg: "Error hashing password" });
  // }

  // const UpdatedBy = req.user.userName;

  try {
    await User.update(
      {
        userName: userName,
        userEmail: userEmail,
        userPhoneNo: userPhone,
        // userPassword: hashedPass,
        role: role,
        UpdatedBy: UpdatedBy,
        DateUpdated: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "User Updated Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const updateTokenUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      token: req.params.id,
      token: req.params.token,
    },
  });
  const { userPassword, confPassword } = req.body;
  let hashedPass;
  if (userPassword === "" || userPassword === null) {
    hashedPass = user.userPassword;
  } else {
    hashedPass = bcrypt.hashSync(userPassword, 10);
  }
  if (userPassword !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password and Confirm Password do not match" });
  try {
    await User.update(
      {
        userPassword: hashedPass,
      },
      {
        where: {
          token: req.params.id,
          token: req.params.token,
        },
      }
    );
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// const deleteUser = async (req, res) => {
//   const user = await User.findOne({
//     where: {
//       id: req.params.id,
//       Active: true,
//       Deleted: false,
//     },
//   });
//   if (!user) return res.status(404).json({ msg: "User not found" });
//   console.log(req.user);


//   try {
//     await User.update(
//         {
//           Active: false,
//           Deleted: true,
//           DateDeleted: Sequelize.literal("CURRENT_TIMESTAMP"),
//         },
//         {
//           where: {
//             id: user.id,
//           },
//         }
//       );
//     res.status(200).json({ msg: "User Deleted" });
//   } catch (error) {
//     res.status(400).json({ msg: error.message });
//   }
// };

const deleteUser = async (req, res) => {
  try {
    // Find the user by ID and ensure they are active and not deleted
    const user = await User.findOne({
      where: {
        id: req.params.id,
        Active: true,
        Deleted: false,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update the user to mark them as deleted
    await User.update(
      {
        Active: false,
        Deleted: true,
        DateDeleted: new Date(), // Set the current date and time
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};


module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateTokenUser,
  deleteUser,
  getInActive,
  ActivateUser
};
