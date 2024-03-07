const express = require('express');

const router = express.Router();


const {registerComplaints} = require("../controllers/registerComplaints");


router.post('/registerComplaints',registerComplaints);


module.exports = router;