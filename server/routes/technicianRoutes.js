const express = require('express');

const router = express.Router();


const {getAllComplaints,acceptComplaints,resolveComplaints} = require("../controllers/technicianDashboard");



router.get('/getAllComplaints',getAllComplaints);
router.post('/acceptComplaints',acceptComplaints);
router.post('/resolveComplaints',resolveComplaints);

module.exports = router;