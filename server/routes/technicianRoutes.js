const express = require('express');

const router = express.Router();


const {getAllComplaints,acceptComplaints,resolveComplaints,getAllBillsStatus} = require("../controllers/technicianDashboard");



router.get('/getAllComplaints',getAllComplaints);
router.post('/acceptComplaints',acceptComplaints);
router.post('/resolveComplaints',resolveComplaints);
router.post('/getAllBillsStatus',getAllBillsStatus);

module.exports = router;