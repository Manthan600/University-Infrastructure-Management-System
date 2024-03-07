const express = require('express');

const router = express.Router();


const {loginUser, loginTechnician, loginAdmin, loginAccountSection} = require("../controllers/login");


router.post('/loginUser',loginUser);
router.post('/loginTechnician',loginTechnician);
router.post('/loginAdmin',loginAdmin);
router.post('/loginAccountSection',loginAccountSection);

module.exports = router;