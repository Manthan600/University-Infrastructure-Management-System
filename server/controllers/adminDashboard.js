let connection;

exports.setup = (database) => {
    console.log(connection, " connection reaches admin page");
    connection = database;
}

exports.approveComplaint = async (req, res) => {
    try {
        const { token_id, device_type, user_type } = req.body;
        if (user_type == "admin") {
            let DEVICE_TABLE_NAME;
            let DEVICE_ID;
            let DEVICE_COMPLAINTS;

            if (device_type === "computer") {
                DEVICE_TABLE_NAME = "computer";
                DEVICE_ID = "comp_id";
                DEVICE_COMPLAINTS = "comp_complaints";
            }
            else if (device_type === "ac") {
                DEVICE_TABLE_NAME = "ac";
                DEVICE_ID = "ac_id";
                DEVICE_COMPLAINTS = "ac_complaints";
            }
            else if (device_type === "projector") {
                DEVICE_TABLE_NAME = "projector";
                DEVICE_ID = "proj_id";
                DEVICE_COMPLAINTS = "proj_complaints";
            }

            approve_complaint_query = `UPDATE ${DEVICE_COMPLAINTS} SET admin_approval = '1' WHERE ${DEVICE_COMPLAINTS}.token_id = ?`;
            connection.query(approve_complaint_query, [token_id], (err, results) => {
                if (err) {
                    console.error('Error approving complaints: ' + err.stack);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                return res.status(200).json({
                    data: results,
                    message: `complaint with ${token_id} approved successfully.`
                });
            });
        }

    }
    catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            data: 'Internal server error ',
            message: err.message
        })
    }
}


exports.addComputerModel = async (req, res) => {
    try {
        const { user_type, ram, storage, gpu, gpu_size, processor, monitor_size, linux, windows } = req.body;
        if (user_type === "admin") {
            console.log("adding computer model");
            console.log("before query executed");

            const insertComputerQuery = `INSERT INTO comp_model ( RAM, Storage, GPU, GPU_size, Processor,monitor_size,linux,windows) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)`;
            await connection.query(insertComputerQuery, [ram, storage, gpu, gpu_size, processor, monitor_size, linux, windows], (err, insertComputerResults) => {
                if (err) {
                    console.error('Error inserting complaint: ' + err.stack);
                    console.log(err.message);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                console.log("query executed");
                return res.status(200).json({
                    message: "Products added successfully",
                    data: insertComputerResults,
                })

            });
        }
        else {
            console.log("only admis can access")
            res.status(401).json({
                message: 'Only admins can access'
            })
        }
    }
    catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            data: 'Internal server error ',
            message: err.message
        })
    }

}


exports.addProjectorModel = async (req, res) => {
    try {
        const { user_type, resolution, brightness, lamp_life } = req.body;
        if (user_type === "admin") {
            const insertProjectorQuery = `INSERT INTO proj_model ( resolution, brightness, lamp_life) VALUES ( ?, ?, ?)`;
            await connection.query(insertProjectorQuery, [resolution, brightness, lamp_life], (err, insertProjectorResults) => {
                if (err) {
                    console.error('Error inserting device: ' + err.stack);
                    console.log(err.message);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                console.log("query executed");
                return res.status(200).json({
                    message: "Products added successfully",
                    data: insertProjectorResults,
                })

            });
        }
        else {
            console.log("only admis can access")
            res.status(401).json({
                message: 'Only admins can access'
            })
        }
    }
    catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            data: 'Internal server error ',
            message: err.message
        })
    }

}

exports.addACModel = async (req, res) => {
    try {
        const { user_type, cooling_capacity, power_consumption } = req.body;
        if (user_type === "admin") {
            const insertAcQuery = `INSERT INTO ac_model ( cooling_capacity, power_consumption) VALUES ( ?, ?)`;
            await connection.query(insertAcQuery, [cooling_capacity, power_consumption], (err, insertAcResults) => {
                if (err) {
                    console.error('Error inserting device: ' + err.stack);
                    console.log(err.message);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                console.log("query executed");
                return res.status(200).json({
                    message: "Products added successfully",
                    data: insertAcResults,
                })

            });
        }
        else {
            console.log("only admis can access")
            res.status(401).json({
                message: 'Only admins can access'
            })
        }
    }
    catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            data: 'Internal server error ',
            message: err.message
        })
    }

}


exports.addDevice = async (req, res) => {
    try {
        const { no_of_devices, device_type, user_type, device_info } = req.body;
        if (user_type == "admin") {
            let DEVICE_TABLE_NAME;
            let DEVICE_ID;
            let DEVICE_COMPLAINTS;
            let DEVICE_MODELS;

            if (device_type === "computer") {
                DEVICE_TABLE_NAME = "computer";
                DEVICE_ID = "comp_id";
                DEVICE_COMPLAINTS = "comp_complaints";
                DEVICE_MODELS = "comp_model";
            }
            else if (device_type === "ac") {
                DEVICE_TABLE_NAME = "ac";
                DEVICE_ID = "ac_id";
                DEVICE_COMPLAINTS = "ac_complaints";
                DEVICE_MODELS = "ac_model";
            }
            else if (device_type === "projector") {
                DEVICE_TABLE_NAME = "projector";
                DEVICE_ID = "proj_id";
                DEVICE_COMPLAINTS = "proj_complaints";
                DEVICE_MODELS = "proj_model";
            }

            const insertDeviceQuery = `INSERT INTO ${DEVICE_TABLE_NAME} ( model_id, Room_id, Company, DOI, status) VALUES ( ?, ?, ?, ?, ?)`;
            for (i = 0; i < no_of_devices; i++) {
                connection.query(insertDeviceQuery, [device_info.model_id, device_info.Room_id, device_info.Company, device_info.DOI, device_info.status], (err, insertDeviceResults) => {
                    if (err) {
                        console.error('Error inserting complaint: ' + err.stack);
                        console.log(err.message);
                        return res.status(500).json({ error: 'Internal server error' });
                    }
                });
            }
            return res.status(200).json({
                message: "Products added successfully",
            })
        }
        else {
            console.log("only admis can access")
            res.status(401).json({
                message: 'Only admins can access'
            })
        }
    }

    catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            data: 'Internal server error ',
            message: err.message
        })
    }
}

exports.addComputer = async (req, res) => {
    try {
        const { new_model, device_type, user_type, } = req.body;
    }
    catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            data: 'Internal server error ',
            message: err.message
        })
    }

}