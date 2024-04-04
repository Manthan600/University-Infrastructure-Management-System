const express = require('express');

const router = express.Router();


const {accountsBillApproval,getAllBillsAccounts} = require("../controllers/accountSectionDashboard");


router.post('/accountsBillApproval',accountsBillApproval);
router.post('/getAllBillsAccounts',getAllBillsAccounts);
module.exports = router;
