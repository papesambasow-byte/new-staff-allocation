const express =require ('express')
const {
  getEmailNotification,
  getEmailNotificationById,
  updateEmailNotification,
  createEmailNotification,
  deleteEmailNotification,
  getInActiveEmail,
  ActivateEmail
} =require ("../Controller/EmailNotificationController.js");

const {verifyToken, bothOnly, adminOnly} = require ("../middleware/AuthUser.js")
const router = express.Router()


router.get('/emailNotification',verifyToken, bothOnly, getEmailNotification);
router.get('/inActiveEmail',verifyToken, adminOnly, getInActiveEmail);
router.get('/emailNotification/:id',verifyToken, adminOnly, getEmailNotificationById);
router.patch('/emailNotification/:id',verifyToken, adminOnly, updateEmailNotification);
router.patch('/activateEmail/:id',verifyToken, adminOnly, ActivateEmail);
router.post('/emailNotification',verifyToken, adminOnly, createEmailNotification);
router.delete('/emailNotification/:id', verifyToken, bothOnly, deleteEmailNotification);


module.exports= router;