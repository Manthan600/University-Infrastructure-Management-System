const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Example route to handle POST requests to /api/v1/registerComplaints
app.post('/api/v1/registerComplaints', (req, res) => {
    // Example logic to handle the complaint registration
    console.log('Received complaint:', req.body);
    res.json({ message: 'Complaint registered successfully' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
