const mysql = require('mysql');
require("dotenv").config();


const dbConnect = () =>{

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'predator',
        password: 'predator',
        database: 'infrastructure_management'
      });
      
      // Connect to MySQL
      connection.connect((err) => {
        if (err) {
          console.error('Error connecting to MySQL: ' + err.stack);
          console.log("error connecting mysql uer");
          return;
        }
        console.log('Connected to MySQL as id ' + connection.threadId);
      });
      return connection;
}

module.exports = dbConnect;