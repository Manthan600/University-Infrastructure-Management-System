// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Route to handle POST requests to /api/v1/registerComplaints
app.post('/api/v1/registerComplaints', (req, res) => {
    // Log the received data
    console.log('Received Data:', req.body);

    // Send a response to mimic the behavior in Postman
    const responseData = {
        message: 'Complaint registered successfully',
        data: req.body
    };

    // Send the response
    res.json(responseData);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
