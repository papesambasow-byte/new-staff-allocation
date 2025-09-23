const express =require ('express')
const {
    getPythonScript,
} =require ("../Controller/PythonScript.js");

const {verifyToken, adminOnly} = require ("../middleware/AuthUser.js")
const router = express.Router()


router.get('/runPython',verifyToken, adminOnly,  getPythonScript);



module.exports= router;