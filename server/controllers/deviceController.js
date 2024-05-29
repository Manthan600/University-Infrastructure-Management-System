let connection;

exports.setup = (database) => {
    connection = database;
}


// exports.addDevice = async (req, res) => {
//     try {
//         const { device_type, model_id, Room_id, Company, DOI, status } = req.body;
//         const deviceTable = device_type === 'computer' ? 'computer' : (device_type === 'ac' ? 'ac' : 'projector');
//         console.log(deviceTable);
//         const insertDeviceQuery = `
//             INSERT INTO ${deviceTable} (model_id, room_id, Company, DOI, status)
//             VALUES (?, ?, ?, ?, ?);
//         `;

//         await connection.query(insertDeviceQuery, [model_id, Room_id, Company, DOI, status]);
//             console.log(connection.query(insertDeviceQuery, [model_id, Room_id, Company, DOI, status])           );
//         res.status(200).json({ message: 'Device added successfully' });
//     } catch (error) {
//         console.error('Error adding device:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

exports.addDevice = (req, res) => {
    try {
        const { device_type, model_id, Room_id, Company, DOI, status, dept_id } = req.body;
        let device_id;

        const deviceTable = device_type === 'computer' ? 'computer' : (device_type === 'ac' ? 'ac' : 'projector');
        // console.log(deviceTable);
        // Fetch the last inserted comp_id
        if (device_type === 'computer') {
            device_id = 'comp_id';
        } else if (device_type === 'projector') {
            device_id = 'proj_id';
        } else if (device_type === 'ac') {
            device_id = 'ac_id';
        } else {
            return res.status(400).json({ error: 'Invalid device type' });
        }
        const getLastCompIdQuery = `SELECT ${device_id} FROM ${deviceTable} ORDER BY ${device_id} DESC LIMIT 1`;
        connection.query(getLastCompIdQuery, (err, rows) => {
            if (err) {
                console.error('Error fetching last comp_id: ' + err.stack);
                return res.status(500).json({ error: 'Internal server error' });
            }

            let id_val;
            if (rows.length > 0) {
                // Increment the last comp_id by 1
                id_val = rows[0].device_id + 1;
            } else {
                // If no records found, start with 1
                id_val = 1;
            }

            // Insert the new device with the incremented comp_id
            const insertDeviceQuery = `INSERT INTO ${deviceTable} (${device_id}, model_id, Room_id, Company, DOI, status, dept_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            const values = [id_val, model_id, Room_id, Company, DOI, status, dept_id];

            connection.query(insertDeviceQuery, values, (err, results) => {
                if (err) {
                    console.error('Error registering device: ' + err.stack);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                // Return success response
                return results.status(200).json({
                    message: 'Device registered successfully',
                    comp_id: comp_id
                });
            });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            data: 'Internal server error',
            message: err.message
        });
    }
};

