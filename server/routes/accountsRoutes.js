const express = require('express');

const router = express.Router();


const {accountsBillApproval,getAllBillsAccounts,getAllPaidBillsAccounts} = require("../controllers/accountSectionDashboard");


router.post('/accountsBillApproval',accountsBillApproval);
router.post('/getAllBillsAccounts',getAllBillsAccounts);
router.post('/getAllPaidBillsAccounts',getAllPaidBillsAccounts);
module.exports = router;
