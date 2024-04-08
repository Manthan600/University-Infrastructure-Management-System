const express = require('express');
require("dotenv").config({ path: ".env" });

const router = express.Router();


const {checkout , paymentVerification} = require("../controllers/payment");


router.post('/checkout',checkout);
router.post('/paymentVerification',paymentVerification);
router.get("/getkey", (req, res) =>
res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

module.exports = router;