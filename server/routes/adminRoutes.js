const express = require('express');

const router = express.Router();


const {approveComplaint, addDevice,addComputerModel,addProjectorModel,addACModel,adminApproveBill,getAllBillsAdmin, deleteComplaint, getAllComplaintsAdmin, getAllDevices, getAllUsers} = require("../controllers/adminDashboard");


router.post('/approveComplaint',approveComplaint);
router.post('/addDevice',addDevice);
router.post('/addComputerModel',addComputerModel);
router.post('/addProjectorModel',addProjectorModel);
router.post('/addACModel',addACModel);
router.post('/adminApproveBill',adminApproveBill);
router.post('/getAllBillsAdmin',getAllBillsAdmin);


router.post('/deleteComplaint', deleteComplaint);
router.get('/getAllComplaintsAdmin', getAllComplaintsAdmin);
router.get('/getAllDevices', getAllDevices);
router.get('/getAllUsers', getAllUsers);


module.exports = router;