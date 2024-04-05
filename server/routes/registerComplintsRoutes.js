const express = require('express');

const router = express.Router();


const {registerComplaints,registerComplaintQR,getStudentComplaints} = require("../controllers/registerComplaints");


router.post('/registerComplaints',registerComplaints);
router.post('/getStudentComplaints',getStudentComplaints);
router.get('/registerComplaintQR',registerComplaintQR);


module.exports = router;