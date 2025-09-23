const express =require ('express')
const {
    voiceLogsSearch,
    getAllVoiceLogs,
    getMonthlyVoiceSum,
    getAllTotalVoiceLogs,
    getMonthlyVoiceSums
} =require ("../Controller/VoiceLogsController.js");

const {verifyToken, bothOnly, adminOnly} = require("../middleware/AuthUser.js")
const router = express.Router()


router.get('/staff_entitlement_logs_voice', verifyToken, bothOnly, getAllVoiceLogs);
router.get('/monthlyVoiceSums/:year/:month', verifyToken, bothOnly, getMonthlyVoiceSums);
router.get('/allTotalVoiceLogs', verifyToken, bothOnly, getAllTotalVoiceLogs);
router.post('/staff_entitlement_logs_voice', verifyToken, bothOnly, voiceLogsSearch);
router.get('/staffinformationTotalVoiceSum/:year',verifyToken, bothOnly, getMonthlyVoiceSum);


module.exports= router;