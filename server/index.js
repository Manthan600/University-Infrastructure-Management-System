const express = require('express');
const cors = require('cors')
const login = require('./controllers/login');
const registerComplaints_db = require('./controllers/registerComplaints');
const technicians_db = require('./controllers/technicianDashboard');
const admin_db = require('./controllers/adminDashboard');
const accounts_db = require('./controllers/accountSectionDashboard');

const loginUser = require("./routes/loginRoutes");
const registerComplaints = require("./routes/registerComplintsRoutes");
const technicians = require("./routes/technicianRoutes");
const devices = require("./routes/devices");
const admin = require("./routes/adminRoutes");
const accountSection = require("./routes/accountsRoutes");

const app = express();

app.use(cors());
require("dotenv").config();

const PORT = process.env.PORT || 4000;

// Parse middleware

app.use(express.json());
app.use(cors())

app.use("/api/v1",loginUser);
app.use("/api/v1",registerComplaints);
app.use("/api/v1",technicians);
app.use("/api/v1",admin);
app.use("/api/v1",accountSection);


// start server

app.listen(PORT, () => {
    console.log(`Server started at port number ${PORT}`);
})

const dbConnect = require("./config/database");

const connection = dbConnect();
login.setup(connection);
registerComplaints_db.setup(connection);
technicians_db.setup(connection);
admin_db.setup(connection);
accounts_db.setup(connection);


app.get("/", (req, res) => {
    res.send("<h1> This is my yard </h1>")
})










