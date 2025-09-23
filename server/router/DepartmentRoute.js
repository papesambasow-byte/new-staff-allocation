const express =require ('express')
const {
    getDepartment,
    getDepartmentById,
    updateDepartment,
    createDepartment,
    deleteDepartment,
    ActivateDepartment,
    getInActiveDepartment
} =require ("../Controller/DepartmentController.js");

const {verifyToken, bothOnly, adminOnly} = require ("../middleware/AuthUser.js")
const router = express.Router()


router.get('/department',verifyToken, bothOnly, getDepartment);
router.get('/inActiveDepartment',verifyToken, bothOnly, getInActiveDepartment);
router.get('/department/:id',verifyToken, adminOnly, getDepartmentById);
router.patch('/department/:id',verifyToken, adminOnly, updateDepartment);
router.patch('/activateDepartment/:id',verifyToken, adminOnly,ActivateDepartment);
router.post('/department',verifyToken, adminOnly, createDepartment);
router.delete('/department/:id', verifyToken, bothOnly, deleteDepartment);


module.exports= router;