const axios = require('axios');

const url = 'http://localhost:3000/api/v1/registerComplaints';

// const data = {
//   mis: 112103002,
//   device_id: 100,
//   description: "monitor not working",
//   user_type: "admin",
//   complaint_type: "computer"
// };

const data = req.body ;
axios.post(url, data)
  .then(response => {
    console.log('Response:', response.data);
    
  })
  .catch(error => {
    console.error('Error:', error);
  });
