let connection;

exports.setup = (database) => {
    console.log(connection, " connection reaches register complaints page");
    connection = database;
}

exports.registerComplaints = (req, res) => {
    try {
        const { mis, device_id, description, user_type, complaint_type } = req.body;
        if (!mis || !device_id || !description || !user_type) {
            return res.status(400).json({ error: 'Invalid complaint details' });
        }

        if (user_type === "normal" || user_type === "admin") {
            let DEVICE_TABLE_NAME;
            let DEVICE_ID;
            let DEVICE_COMPLAINTS;

            if (complaint_type === "computer"){
                DEVICE_TABLE_NAME = "computer";
                DEVICE_ID = "comp_id";
                DEVICE_COMPLAINTS = "comp_complaints";                
            }
            else if (complaint_type === "ac"){
                DEVICE_TABLE_NAME = "ac";
                DEVICE_ID = "ac_id";
                DEVICE_COMPLAINTS = "ac_complaints";                
            }
            else if (complaint_type === "projectors"){
                DEVICE_TABLE_NAME = "projector";
                DEVICE_ID = "proj_id";
                DEVICE_COMPLAINTS = "proj_complaints";                
            }


            // Check if device exists in DB
            const checkDeviceQuery = `SELECT COUNT(*) AS deviceCount FROM ${DEVICE_TABLE_NAME} WHERE ${DEVICE_ID} = ?`;
            connection.query(checkDeviceQuery, [device_id], (err, rows) => {
                if (err) {
                    console.error('Error checking device ID: ' + err.stack);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                const deviceCount = rows[0].deviceCount;
                if (deviceCount === 0) {
                    return res.status(404).json({ error: 'Device not found in comp_model contact admin' });
                }


                // check if device is already faulty.
                const checkQuery = `SELECT COUNT(*) AS deviceCount FROM ${DEVICE_COMPLAINTS} WHERE ${DEVICE_ID} = ?`;
                connection.query(checkQuery, [device_id], (err, rows) => {
                    if (err) {
                        console.error('Error checking device ID: ' + err.stack);
                        return res.status(500).json({ error: 'Internal server error' });
                    }

                    const deviceCount = rows[0].deviceCount;
                    if (deviceCount > 0) {
                        return res.status(409).json({ error: 'Device is already faulty' });
                    }

                    const currentDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD

                    // Insert the complaint into the database
                    const insertQuery = `INSERT INTO ${DEVICE_COMPLAINTS} (student_id, ${DEVICE_ID}, description, complaint_date, admin_approval) VALUES (?, ?, ?, ?, ?)`;
                    const values = [mis, device_id, description, currentDate, false];

                    connection.query(insertQuery, values, (err, results) => {
                        if (err) {
                            console.error('Error registering complaint: ' + err.stack);
                            return res.status(500).json({ error: 'Internal server error' });
                        }

                        // Fetch the token number for the inserted complaint
                        const tokenId = results.insertId; // Assuming token_id is auto-incremented and primary key
                        if (!tokenId) {
                            return res.status(500).json({ error: 'Failed to retrieve token number' });
                        }

                        return res.status(200).json({
                            message: 'Complaint registered successfully',
                            data: tokenId,
                            result: results
                        });
                    });
                });
            });
        }

    }
    catch (err) {
        console.error(err);
        console.log(err);
        return res.status(500).json({
            success: false,
            data: 'Internal server error ',
            message: err.message
        })
    }
}
