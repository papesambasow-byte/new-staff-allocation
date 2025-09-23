const express = require ("express");
const {createAuditTrail,getAuditTrail, getAuditTrailById,getAuditPerDay } = require ( "../Controller/AuditController.js")

const { verifyToken, adminOnly} = require ("../middleware/AuthUser.js");

const router = express.Router()

router.post('/auditTrail', verifyToken, createAuditTrail)
router.get('/auditTrail',  verifyToken, adminOnly, getAuditTrail)
router.get('/auditPerDay',  verifyToken, adminOnly, getAuditPerDay)
router.get('auditTrail/:id', verifyToken, adminOnly, getAuditTrailById)

module.exports = router