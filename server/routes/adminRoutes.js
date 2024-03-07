const express = require('express');

const router = express.Router();


const {approveComplaint} = require("../controllers/adminDashboard");


router.post('/approveComplaint',approveComplaint);


module.exports = router;