const express =require ('express')
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    updateTokenUser,
    deleteUser,
    getInActive,
    ActivateUser
} =require ("../Controller/UserController.js");
const{forgotPassword,resetPasswordToken, resetPassword} = require("../Controller/UserRestPass.js")


const { adminOnly, verifyToken} =require ('../middleware/AuthUser.js');

const router = express.Router()

router.post('/forgotPassword', forgotPassword)
router.post('/reset-password/:token',  resetPasswordToken)
router.post('/resetPassword',  resetPassword)

router.get('/users',verifyToken, adminOnly,getUsers);
router.get('/userInActive',verifyToken, adminOnly,getInActive);
router.get('/users/:id', verifyToken, adminOnly, getUserById);
router.post('/users', createUser);
router.patch('/users/:id', verifyToken, adminOnly, updateUser);
router.patch('/update/:id', verifyToken, adminOnly,updateTokenUser);
router.patch('/activateUser/:id', verifyToken, adminOnly,ActivateUser);
router.delete('/users/:id', verifyToken, adminOnly, deleteUser);

module.exports= router;