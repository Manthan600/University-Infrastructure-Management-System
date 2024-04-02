const express = require('express');

const router = express.Router();


const {approveComplaint, addDevice,addComputerModel,addProjectorModel,addACModel} = require("../controllers/adminDashboard");


router.post('/approveComplaint',approveComplaint);
router.post('/addDevice',addDevice);
router.post('/addComputerModel',addComputerModel);
router.post('/addProjectorModel',addProjectorModel);
router.post('/addACModel',addACModel);


module.exports = router;