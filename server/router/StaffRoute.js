const express =require ('express')
const {
    getAllStaffAllocation,
    getStaffAllocationById,
    updateStaffAllocation,
    createStaffAllocation,
    deleteStaffAllocation,
    getMonthlyVoiceSumss,
    getDepartmentData,
    getAllStaffSumOfVoice,
    getAllStaffSumOfSms,
    getAllStaffSumOfData
} =require ("../Controller/StaffAllocationController.js");

const { verifyToken, bothOnly, adminOnly} = require ('../middleware/AuthUser.js');


const router = express.Router()


router.get('/staffEntitlement_tb',verifyToken, bothOnly, getAllStaffAllocation);
router.get('/departmentData',verifyToken, bothOnly, getDepartmentData);
router.get('/monthlyVoiceSumss',verifyToken, bothOnly, getMonthlyVoiceSumss);
router.get('/staffEntitlement_tb/:id', verifyToken, adminOnly,  getStaffAllocationById);
router.post('/staffEntitlement_tb', verifyToken, adminOnly,  createStaffAllocation);
router.patch('/staffEntitlement_tb/:id', verifyToken, adminOnly,  updateStaffAllocation);
router.delete('/staffEntitlement_tb', verifyToken, adminOnly,  deleteStaffAllocation);
router.get('/staffinformationSumOfVoice',verifyToken,  getAllStaffSumOfVoice);
router.get('/staffinformationSumOfSms',verifyToken,  getAllStaffSumOfSms);
router.get('/staffinformationSumOfData',verifyToken,  getAllStaffSumOfData);


module.exports= router;