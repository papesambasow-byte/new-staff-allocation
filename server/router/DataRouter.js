const express =require ('express')
const {
    getAllDataLogs,
    dataLogsSearch,
    getMonthlyDataSum,
    getAllTotalDataLogs,
    getAllTotalSmsLogs,
    getMonthlyDataSums
} =require ("../Controller/DataLogsController.js");

const {verifyToken, bothOnly, adminOnly} = require ("../middleware/AuthUser.js")
const router = express.Router()


router.get('/staff_entitlement_logs_data',verifyToken, bothOnly, getAllDataLogs);
router.get('/monthlyDataSums/:year/:month',verifyToken, bothOnly, getMonthlyDataSums);
router.get('/staffinformationTotalDataSum/:year',verifyToken, bothOnly, getMonthlyDataSum);
router.get('/allTotalDataLogs',verifyToken, adminOnly, getAllTotalDataLogs);
router.get('/allTotalSmsLogs',verifyToken, adminOnly, getAllTotalSmsLogs);
router.post('/staff_entitlement_logs_data', verifyToken, bothOnly, dataLogsSearch);


module.exports= router;