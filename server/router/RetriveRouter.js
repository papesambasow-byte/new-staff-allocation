const express =require ('express')
const {
    getAllRetrive,
    getRetriveById,
    updateRetrive,
    createRetrive,
    deleteRetrive,
} =require ("../Controller/RetriveController.js");

const {verifyToken, adminOnly, bothOnly} = require ("../middleware/AuthUser.js")
const router = express.Router()


router.get('/staff_allocation_levelTB', verifyToken, bothOnly, getAllRetrive);
router.get('/staff_allocation_levelTB/:id', verifyToken, adminOnly, getRetriveById);
router.post('/staff_allocation_levelTB', verifyToken, adminOnly, createRetrive);
router.patch('/staff_allocation_levelTB/:id', verifyToken, adminOnly, updateRetrive);
router.delete('/staff_allocation_levelTB/:id', verifyToken, bothOnly, deleteRetrive);



module.exports= router;