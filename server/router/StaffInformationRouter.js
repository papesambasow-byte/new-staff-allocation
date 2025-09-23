const express =require("express")
const {
    getAllStaffInformation,
    getStaffInformationById,
    updateStaffInformation,
    createStaffInformation,
    deleteStaffInformation,
    getAllStaffInformationSumOfVoice,
    getAllStaffInformationSumOfSms,
    getAllStaffInformationSumOfData,
} = require("../Controller/StaffInformationController.js")

const { verifyToken, bothOnly, adminOnly} = require ('../middleware/AuthUser.js');

const router = express.Router()

router.get('/staffinformationTotalSumOfVoice',verifyToken, bothOnly, getAllStaffInformationSumOfVoice);
router.get('/staffinformationTotalSumOfSms',verifyToken, bothOnly, getAllStaffInformationSumOfSms);
router.get('/staffinformationTotalSumOfData',verifyToken, bothOnly, getAllStaffInformationSumOfData);
router.get('/staffinformation',verifyToken, bothOnly, getAllStaffInformation);
router.get('/staffinformation/:id', verifyToken, adminOnly,  getStaffInformationById);
router.post('/staffinformation', verifyToken, adminOnly,  createStaffInformation);
router.patch('/staffinformation/:id', verifyToken, adminOnly,  updateStaffInformation);
router.delete('/staffinformation/:id', verifyToken, adminOnly,  deleteStaffInformation);

module.exports =router