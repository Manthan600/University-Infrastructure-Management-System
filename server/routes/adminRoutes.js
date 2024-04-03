const express = require('express');

const router = express.Router();


const { approveComplaint, deleteComplaint, getAllComplaintsAdmin, getAllDevices, getAllUsers } = require("../controllers/adminDashboard");


router.post('/approveComplaint', approveComplaint);
router.post('/deleteComplaint', deleteComplaint);
router.get('/getAllComplaintsAdmin', getAllComplaintsAdmin);
router.get('/getAllDevices', getAllDevices);
router.get('/getAllUsers', getAllUsers);


module.exports = router;