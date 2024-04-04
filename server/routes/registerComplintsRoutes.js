const express = require('express');

const router = express.Router();


const {registerComplaints,registerComplaintQR} = require("../controllers/registerComplaints");


router.post('/registerComplaints',registerComplaints);
router.get('/registerComplaintQR',registerComplaintQR);


module.exports = router;