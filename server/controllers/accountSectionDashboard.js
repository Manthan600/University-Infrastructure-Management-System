const sendMail = require("../config/mail");
let connection;

exports.setup = (database) => {
    console.log(connection, " connection reaches admin page");
    connection = database;
}

exports.getAllBillsAccounts = async (req, res) => {
    try {
        console.log("in acc");
        const { user_type } = req.body;
        if (user_type === "accounts") {
            const getPendingBillsQuery = `SELECT * FROM bills WHERE admin_approval = true AND acc_sec_approval = false`;

            connection.query(getPendingBillsQuery, (err, results) => {
                if (err) {
                    console.error('Error fetching pending bills: ' + err.stack);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                return res.status(200).json({
                    data: results
                });
            });
        }
        else {
            res.status(401).json({
                success: false,
                data: 'Unauthorized access',
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: 'Internal server error',
            message: err.message
        });
    }
};

exports.getAllPaidBillsAccounts = async (req, res) => {
    try {
        console.log("in acc");
        const { user_type } = req.body;
        if (user_type === "accounts") {
            const getPendingBillsQuery = `SELECT * FROM bills WHERE admin_approval = true AND acc_sec_approval = true`;

            connection.query(getPendingBillsQuery, (err, results) => {
                if (err) {
                    console.error('Error fetching pending bills: ' + err.stack);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                return res.status(200).json({
                    data: results
                });
            });
        }
        else {
            res.status(401).json({
                success: false,
                data: 'Unauthorized access',
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: 'Internal server error',
            message: err.message
        });
    }
};


exports.accountsBillApproval = async (req, res) => {
    try {
        const { order_id, user_type } = req.body; // Assuming admin_id is available in the request

        // Check if bill_id exists and if admin approval is granted
        if (user_type == "accounts") {
            const checkBillQuery = `SELECT tech_id FROM bills WHERE order_id = ? AND admin_approval = true`;
            connection.query(checkBillQuery, [order_id], async (err, billResults) => {
                if (err) {
                    console.error('Error checking bill: ' + err.stack);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                if (billResults.length === 0) {
                    console.error('Bill not found or admin approval not granted.');
                    return res.status(404).json({ error: 'Bill not found or admin approval not granted.' });
                }

                const tech_id = billResults[0].tech_id;

                // Fetch technician's email using tech_id
                const fetchTechnicianEmailQuery = `SELECT email FROM technicians WHERE tech_id = ?`;

                connection.query(fetchTechnicianEmailQuery, [tech_id], async (err, technicianResults) => {
                    if (err) {
                        console.error('Error fetching technician email: ' + err.stack);
                        return res.status(500).json({ error: 'Internal server error' });
                    }

                    if (technicianResults.length === 0) {
                        console.error('Technician email not found.');
                        return res.status(404).json({ error: 'Technician email not found.' });
                    }

                    const technicianEmail = technicianResults[0].email;

                    // Query to update the acc_sec_approval column of the bills table
                    const approveBillQuery = `UPDATE bills SET acc_sec_approval = true WHERE order_id = ?`;

                    // Execute the query to approve the bill from the accounts section
                    connection.query(approveBillQuery, [order_id], async (err, results) => {
                        if (err) {
                            console.error('Error approving bill from accounts section: ' + err.stack);
                            return res.status(500).json({ error: 'Internal server error' });
                        }

                        // Send email notification
                        try {
                            const adminEmail = "admin@example.com"; // Replace with admin's email
                            const emailContent = `Bill with Order ID ${order_id} has been approved by the accounts section.`;
                            await sendMail(null, null, "Accounts Section", [technicianEmail], "Bill Approved", emailContent);
                            console.log("Email sent to technician regarding approved bill from accounts section.");

                            return res.status(200).json({
                                message: `Bill with order_id ID ${order_id} approved successfully from accounts section. Email sent to technician.`,
                                data:results,
                            });
                        } catch (emailError) {
                            console.error('Error sending email to technician from accounts section: ' + emailError.stack);
                            return res.status(500).json({ error: 'Internal server error' });
                        }
                    });
                });
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: 'Internal server error',
            message: err.message
        });
    }
};
