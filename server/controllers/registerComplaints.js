let connection;

exports.setup = (database) => {
    connection = database;
}

exports.registerComplaints = (req, res) => {
    try {
        const { userID, device_id, description, user_type, complaint_type } = req.body;
        if (!userID || !device_id || !description || !user_type) {
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
                    const values = [userID, device_id, description, currentDate, false];

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

exports.registerComplaintQR = async(req,res) =>{
    try{
        const device_id = req.query.device_id;
        const device_type = req.query.device_type;

        res.redirect("http://localhost:3000/");

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

};


exports.getStudentComplaints = async (req, res) => {
    try {
        const { student_id } = req.body;
        // console.log(req.body)
        // console.log(student_id);
        const get_complaints_query = `
        SELECT 
        ac_id AS device_id,
        CASE 
            WHEN ac_complaints.resolved_date IS NULL THEN '--' 
            WHEN ac_complaints.resolved_date = '1970-01-01 00:00:00' THEN '--'
            ELSE ac_complaints.resolved_date 
        END AS resolved_date,
        ac_complaints.*
    FROM ac_complaints 
    WHERE ac_complaints.student_id = ${student_id}
    UNION ALL
    SELECT 
        proj_id AS device_id,
        CASE 
            WHEN proj_complaints.resolved_date IS NULL THEN '--' 
            WHEN proj_complaints.resolved_date = '1970-01-01 00:00:00' THEN '--'
            ELSE proj_complaints.resolved_date 
        END AS resolved_date,
        proj_complaints.*
    FROM proj_complaints
    WHERE proj_complaints.student_id = ${student_id}
    UNION ALL
    SELECT 
        comp_id AS device_id,
        CASE 
            WHEN comp_complaints.resolved_date IS NULL THEN '--' 
            ELSE comp_complaints.resolved_date 
        END AS resolved_date,
        comp_complaints.*
    FROM comp_complaints
    WHERE comp_complaints.student_id = ${student_id};
    ;
    

        
`;

        connection.query(get_complaints_query, [student_id], (err, results) => {
            if (err) {
                console.error('Error retrieving complaints: ' + err.stack);
                return res.status(500).json({ error: 'Internal server error' });
            }

           // console.log('Retrieved complaints:', results); // Add logging here to see the results

            return res.status(200).json({
                data: results
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: 'Internal server error',
            message: err.message
        });
    }
};
