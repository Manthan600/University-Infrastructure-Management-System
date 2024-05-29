let connection;

exports.setup = (database) => {
    connection = database;
}
const axios = require('axios');
const { log } = require("console");
var crypto = require("crypto");
const Razorpay = require("razorpay");
require("dotenv").config({ path: ".env" });
// console.log("dfsdf",process.env.RAZORPAY_API_KEY);
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

exports.checkout = async (req, res) => {
    console.log("in server checkout");
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  try{
      const order = await instance.orders.create(options);
      const approveBillQuery = `UPDATE bills SET order_id = ? WHERE bill_id = ?`;

                    // Execute the query to approve the bill from the accounts section
      connection.query(approveBillQuery, [order.id,req.body.bill_id], async (err, results) => {
          if (err) {
              console.error('Error approving bill from accounts section: ' + err.stack);
              return res.status(500).json({ error: 'Internal server error' });
          }

        res.status(200).json({
          success: true,
          order,
        });
      });
  }
  catch(err){
    console.log(err.message)
    res.status(400).json({
        success: false,
    })
  }

  
};



exports.paymentVerification = async (req, res) => {
  console.log("in payment verification checkout");
  console.log(req.body);
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  console.log("order id :", razorpay_order_id);
  console.log("pay id :", razorpay_payment_id);

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  console.log(process.env.RAZORPAY_APT_SECRET);
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");
  console.log("Exp : ", expectedSignature);
  console.log("Org : ", razorpay_signature);
  const isAuthentic = expectedSignature === razorpay_signature;
  console.log("auth:", isAuthentic);
  if (isAuthentic) {
    // Make HTTP request with order_id in the body
    try {
      const response = await axios.post('http://localhost:4000/api/v1/accountsBillApproval', {
        order_id: razorpay_order_id,
        user_type: "accounts"
      });

      // Redirect to success page upon successful response
      res.redirect(`http://localhost:3000/acc`);
    } catch (error) {
      console.error('Error making HTTP request:', error);
      // Handle error and redirect to error page or provide appropriate response
      res.status(500).json({
        success: false,
        message: 'Error making HTTP request'
      });
    }
  } else {
    // Signature is not authentic, provide error response
    res.status(400).json({
      success: false,
      message: 'Invalid payment signature'
    });
  }
};
