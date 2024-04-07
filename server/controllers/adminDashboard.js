const sendMail = require("../config/mail");
const generateQRCode = require("../config/qrCode");
let connection;

exports.setup = (database) => {
    console.log(connection, " connection reaches admin page");
    connection = database;
}

// exports.getAllComplaintsAdmin = async (req, res) => {
//     try {
//         const {user_type, device_type } = req.body;
//         // user_type = "admin";
//         // token_id = 1;
//         // device_type = 'computer'
// console.log(device_type);
//         if (user_type === "admin") {
//             let DEVICE_TABLE_NAME;
//             let DEVICE_ID;
//             let DEVICE_COMPLAINTS;

//             if (device_type === "computer") {
//                 DEVICE_TABLE_NAME = "computer";
//                 DEVICE_ID = "comp_id";
//                 DEVICE_COMPLAINTS = "comp_complaints";
//             } else if (device_type === "ac") {
//                 DEVICE_TABLE_NAME = "ac";
//                 DEVICE_ID = "ac_id";
//                 DEVICE_COMPLAINTS = "ac_complaints";
//             } else if (device_type === "projector") {
//                 DEVICE_TABLE_NAME = "projector";
//                 DEVICE_ID = "proj_id";
//                 DEVICE_COMPLAINTS = "proj_complaints";
//             }

//             const get_complaints_query = `
//                 SELECT dc.token_id, dc.description, dc.${DEVICE_ID}, dc.complaint_date, dt.Company, dc.student_id ,dc.resolved_date,dc.tech_id,dc.admin_approval
//                 FROM ${DEVICE_COMPLAINTS} dc 
//                 JOIN ${DEVICE_TABLE_NAME} dt ON dc.${DEVICE_ID} = dt.${DEVICE_ID} 
//                ;
//             `;

//             connection.query(get_complaints_query, [token_id], (err, results) => {
//                 if (err) {
//                     console.error('Error retrieving complaints: ' + err.stack);
//                     return res.status(500).json({ error: 'Internal server error' });
//                 }

//                 // console.log('Retrieved complaints:', results); // Add logging here to see the results

//                 return res.status(200).json({
//                     data: results
//                 });
//             });
//         } else {
//             return res.status(403).json({ error: 'Forbidden', message: 'You do not have permission to perform this action.' });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             success: false,
//             data: 'Internal server error',
//             message: err.message
//         });
//     }
// };

exports.getAllComplaintsAdmin = async (req, res) => {
    try {
        const { user_type } = req.query; // Accessing query parameters using req.query
        const device_type = req.query.device_type; // Accessing device_type query parameter
        // user_type = "admin";
        // token_id = 1;
        // device_type = 'computer'
        console.log(device_type);
        if (user_type === "admin") {
            let DEVICE_TABLE_NAME;
            let DEVICE_ID;
            let DEVICE_COMPLAINTS;

            if (device_type === "computer") {
                DEVICE_TABLE_NAME = "computer";
                DEVICE_ID = "comp_id";
                DEVICE_COMPLAINTS = "comp_complaints";
            } else if (device_type === "ac") {
                DEVICE_TABLE_NAME = "ac";
                DEVICE_ID = "ac_id";
                DEVICE_COMPLAINTS = "ac_complaints";
            } else if (device_type === "projector") {
                DEVICE_TABLE_NAME = "projector";
                DEVICE_ID = "proj_id";
                DEVICE_COMPLAINTS = "proj_complaints";
            }

            const get_complaints_query = `
                SELECT dc.token_id, dc.description, dc.${DEVICE_ID} as device_id, dc.complaint_date, dt.Company, dc.student_id ,dc.resolved_date,dc.tech_id,dc.admin_approval
                FROM ${DEVICE_COMPLAINTS} dc 
                JOIN ${DEVICE_TABLE_NAME} dt ON dc.${DEVICE_ID} = dt.${DEVICE_ID} 
               ;
            `;

            connection.query(get_complaints_query, (err, results) => {
                if (err) {
                    console.error('Error retrieving complaints: ' + err.stack);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                // console.log('Retrieved complaints:', results); // Add logging here to see the results

                return res.status(200).json({
                    data: results
                });
            });
        } else {
            return res.status(403).json({ error: 'Forbidden', message: 'You do not have permission to perform this action.' });
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



exports.approveComplaint = async (req, res) => {
    try {
        const { token_id, device_type, user_type } = req.body;
        console.log(token_id);
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

            // Update complaint approval status
            const approve_complaint_query = `UPDATE ${DEVICE_COMPLAINTS} SET admin_approval = '1' WHERE ${DEVICE_COMPLAINTS}.token_id = ?`;
            connection.query(approve_complaint_query, [token_id], async (err, results) => {
                if (err) {
                    console.error('Error approving complaints: ' + err.stack);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                // Fetch technicians' email IDs from the "technicians" table
                const fetchTechniciansQuery = `SELECT email FROM technicians WHERE field = ?`;
                connection.query(fetchTechniciansQuery, [device_type], async (err, technicianResults) => {
                    if (err) {
                        console.error('Error fetching technicians: ' + err.stack);
                        return res.status(500).json({ error: 'Internal server error' });
                    }

                    // Extract email IDs
                    const technicianEmails = technicianResults.map(technician => technician.email);

                    // Construct email content
                    const emailContent = `A new complaint related to ${device_type} has been registered. Please accept the complaint to resolve it.`;

                    // Send emails to all technicians
                    try {
                        await sendMail(null, null, '"Admin" <admin@example.com>', technicianEmails, "Complaint Approval", emailContent);

                        console.log("Emails sent to all technicians.");

                        return res.status(200).json({
                            data: results,
                            message: `Complaint with ${token_id} approved successfully. Emails sent to technicians.`,
                        });
                    } catch (emailError) {
                        console.error('Error sending emails to technicians: ' + emailError.stack);
                        return res.status(500).json({ error: 'Internal server error' });
                    }

                console.log('Retrieved complaints:', results); // Add logging here to see the results

            });
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

exports.deleteComplaint = async (req, res) => {
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

            delete_complaint_query = `DELETE FROM ${DEVICE_COMPLAINTS} WHERE token_id = ?;`;
            connection.query(delete_complaint_query, [token_id], (err, results) => {
                if (err) {
                    console.error('Error approving complaints: ' + err.stack);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                //console.log('Retrieved complaints:', results); // Add logging here to see the results

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
        });
    }
};

exports.deleteComp = async (req, res) => {
    try {
        const { device_id, device_type, user_type } = req.body;
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

            delete_dev_query = `DELETE FROM ${DEVICE_TABLE_NAME} WHERE ${DEVICE_ID}= ?;`;
            connection.query(delete_dev_query,[device_id],  (err, results) => {
                if (err) {
                    console.error('Error deleting device: ' + err.stack);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                //console.log('Retrieved complaints:', results); // Add logging here to see the results

                return res.status(200).json({
                    data: results,
                    message: `device with ${device_id} deleted successfully.`

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
        });
    }
};


exports.deleteProj = async (req, res) => {
    try {
        const { device_id, device_type, user_type } = req.body;
        if (user_type == "admin") {
            let DEVICE_TABLE_NAME;
            let DEVICE_ID;

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

            delete_dev_query = `DELETE FROM ${DEVICE_TABLE_NAME} WHERE ${DEVICE_ID}= ?;`;
            connection.query(delete_dev_query,[device_id],  (err, results) => {
                if (err) {
                    console.error('Error deleting device: ' + err.stack);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                //console.log('Retrieved complaints:', results); // Add logging here to see the results

                return res.status(200).json({
                    data: results,
                    message: `device with ${device_id} deleted successfully.`

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
        });
    }
};



exports.deleteAc = async (req, res) => {
    try {
        const { device_id, device_type, user_type } = req.body;
        if (user_type == "admin") {
            let DEVICE_TABLE_NAME;
            let DEVICE_ID;

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

            delete_dev_query = `DELETE FROM ${DEVICE_TABLE_NAME} WHERE ${DEVICE_ID}= ?;`;
            connection.query(delete_dev_query,[device_id],  (err, results) => {
                if (err) {
                    console.error('Error deleting device: ' + err.stack);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                //console.log('Retrieved complaints:', results); // Add logging here to see the results

                return res.status(200).json({
                    data: results,
                    message: `device with ${device_id} deleted successfully.`

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
        });
    }
};


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



// exports.addDevice = async (req, res) => {
//     try {
//         const { no_of_devices, device_type, user_type, device_info } = req.body;
//         const data =  { no_of_devices, device_type, user_type, device_info } ;
//         if (user_type == "admin" || "normal " || "technician"  || "") {
//             let DEVICE_TABLE_NAME;
//             let DEVICE_ID;
//             let DEVICE_COMPLAINTS;
//             let DEVICE_MODELS;

//             if (device_type === "computer") {
//                 DEVICE_TABLE_NAME = "computer";
//                 DEVICE_ID = "comp_id";
//                 DEVICE_COMPLAINTS = "comp_complaints";
//                 DEVICE_MODELS = "comp_model";
//             }
//             else if (device_type === "ac") {
//                 DEVICE_TABLE_NAME = "ac";
//                 DEVICE_ID = "ac_id";
//                 DEVICE_COMPLAINTS = "ac_complaints";
//                 DEVICE_MODELS = "ac_model";
//             }
//             else if (device_type === "projector") {
//                 DEVICE_TABLE_NAME = "projector";
//                 DEVICE_ID = "proj_id";
//                 DEVICE_COMPLAINTS = "proj_complaints";
//                 DEVICE_MODELS = "proj_model";
//             }

//             const insertDeviceQuery = `INSERT INTO ${DEVICE_TABLE_NAME} ( model_id, Room_id, Company, DOI, status) VALUES ( ?, ?, ?, ?, ?)`;
//             for (i = 0; i < no_of_devices; i++) {
//                 connection.query(insertDeviceQuery, [device_info.model_id, device_info.Room_id, device_info.Company, device_info.DOI, device_info.status], (err, insertDeviceResults) => {
//                     if (err) {
//                         console.error('Error inserting complaint: ' + err.stack);
//                         console.log(err.message);
//                         return res.status(500).json({ error: 'Internal server error' });
//                     }
//                     const url = `http://localhost:4000/api/v1/registerComplaintQR?device_id=${insertDeviceResults.insertId}&device_type=${device_type}`
//                     const filename = `./qrcodes/${device_type}${insertDeviceResults.insertId}.png`;
//                     generateQRCode(url, filename);
                    
//                 });
//             }
//             return res.status(200).json({
//                 message: "Products added successfully",
//                 data : data
//             })
//         }
//         else {
//             console.log("only admis can access")
//             res.status(401).json({
//                 message: 'Only admins can access'
//             })
//         }
//     }
//     catch (err) {
//         console.error(err);
//         console.log(err);
//         res.status(500).json({
//             success: false,
//             data: 'Internal server error ',
//             message: err.message
//         })
//     }
    
// }


exports.addDevice = async (req, res) => {
    try {
        console.log("inside addDevice")
        const { no_of_devices, device_type, user_type, device_info } = req.body;
        const data =  { no_of_devices, device_type, user_type, device_info };
        let user = 'admin'
        if (user=== "admin") {
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

            const insertDeviceQuery = `INSERT INTO ${DEVICE_TABLE_NAME} (model_id, Room_id, Company, DOI, status) VALUES (?, ?, ?, ?, ?)`;
            
            // Start transaction
            connection.beginTransaction(async (err) => {
                if (err) throw err;
                console.log(no_of_devices);
                for (let i = 0; i < no_of_devices; i++) {
                    try {
                        const insertResult = await connection.query(insertDeviceQuery, [device_info.model_id, device_info.Room_id, device_info.Company, device_info.DOI, device_info.status]);
                        console.log('Device inserted successfully:', device_info);
                        
                        // Generate QR code for each device
                        const url = `http://localhost:4000/api/v1/registerComplaintQR?device_id=${insertResult.insertId}&device_type=${device_type}`;
                        console.log( insertResult);
                        const filename = `./qrcodes/${device_type}${insertResult.insertId}.png`;
                        generateQRCode(url, filename);
                    } catch (insertError) {
                        console.error('Error inserting device:', insertError);
                        // Rollback transaction on error
                        connection.rollback(() => {
                            console.log('Transaction rolled back.');
                        });
                        return res.status(500).json({ error: 'Internal server error' });
                    }
                }
                
                // Commit transaction if all devices inserted successfully
                connection.commit((commitError) => {
                    if (commitError) {
                        console.error('Error committing transaction:', commitError);
                        return res.status(500).json({ error: 'Internal server error' });
                    }
                    console.log('Transaction committed.');
                    return res.status(200).json({ message: 'Products added successfully' });
                });
            });
        }
        else {
            console.log("Only admins can access");
            res.status(401).json({ message: 'Only admins can access' });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, data: 'Internal server error', message: err.message });
    }
};


exports.getAllDevices = async (req, res) => {
    try {
        const { user_type } = req.query;

        if (user_type === "admin") {
       
            // const get_devices_query = `
            //     SELECT *
            //     FROM ${DEVICE_TABLE_NAME}  
            //    ;

            //select * causing variable overwritting in device_id printing
            const get_devices_query = `
            SELECT 
                    comp_id AS device_id,
                    model_id,
                    Room_id,
                    Company,
                    DOI,
                    status,
                    'computer' AS device_type
                FROM computer
                UNION
                SELECT 
                    proj_id AS device_id,
                    model_id,
                    Room_id,
                    Company,
                    DOI,
                    status,
                    'projector' AS device_type
                FROM projector
                UNION
                SELECT 
                    ac_id AS device_id,
                    model_id,
                    Room_id,
                    Company,
                    DOI,
                    status,
                    'ac' AS device_type
                FROM ac
               ;
            `;

            connection.query(get_devices_query, (err, results) => {
                if (err) {
                    console.error('Error retrieving complaints: ' + err.stack);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                //console.log('Retrieved All devices:', results); // Add logging here to see the results

                return res.status(200).json({
                    data: results
                });
            });
        } else {
            return res.status(403).json({ error: 'Forbidden', message: 'You do not have permission to perform this action.' });
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


exports.rooms = async (req, res) => {
    try {
        // const {  device_type, user_type } = req.body;
        user_type = "admin";
        // device_type='computer'

        if (user_type === "admin") {
           
            const get_rooms_query = `
            SELECT * FROM rooms;
            `;

            connection.query(get_rooms_query, (err, results) => {
                if (err) {
                    console.error('Error retrieving rooms: ' + err.stack);
                    return res.status(500).json({ error: 'Internal server error' });
                }

             //   console.log('Retrieved All rooms:', results); // Add logging here to see the results

                return res.status(200).json({
                    data: results
                });
            });
        } else {
            return res.status(403).json({ error: 'Forbidden', message: 'You do not have permission to perform this action.' });
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


exports.models = async (req, res) => {
    try {
        const { device_type, user_type } = req.body;
        // For testing, user_type hardcoded to "admin"
        user_type = "admin";
        
        if (user_type === "admin") {
            let modelName;
            if (device_type === "computer") {
                modelName = "comp_models";
            } else if (device_type === "ac") {
                modelName = "ac_models";
            } else if (device_type === "projector") {
                modelName = "proj_models";
            } else {
                return res.status(400).json({ error: 'Bad Request', message: 'Invalid device type' });
            }
           
            const get_models_query = `
                SELECT * FROM ${modelName};
            `;

            connection.query(get_models_query, (err, results) => {
                if (err) {
                    console.error('Error retrieving models: ' + err.stack);
                    return res.status(500).json({ error: 'Internal server error' });
                }

             //   console.log('Retrieved models:', results); // Add logging here to see the results

                return res.status(200).json({
                    data: results
                });
            });
        } else {
            return res.status(403).json({ error: 'Forbidden', message: 'You do not have permission to perform this action.' });
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



exports.getAllUsers = async (req, res) => {
    try {
        const user_type = "admin"; // Assuming user_type is hardcoded for now

        if (user_type === "admin") {
            const get_users_query = `
            SELECT 'student' AS user_type, MIS, password, name, branch, contact_no, null AS address, null AS city, null AS zip, null AS field FROM students
            UNION
            SELECT 'technician' AS user_type, tech_id, password, name, null AS branch, contact_no, address, city, zip, field FROM technicians
            UNION
            SELECT 'admin' AS user_type, username, password, name, null AS branch, null AS contact_no, null AS address, null AS city, null AS zip, null AS field FROM admin
            UNION
            SELECT 'account_section' AS user_type, username, password, name, null AS branch, null AS contact_no, null AS address, null AS city, null AS zip, null AS field FROM account_section;
            
            `;

            connection.query(get_users_query, (err, results) => {
                if (err) {
                    console.error('Error retrieving users:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                const students = results.filter(user => user.user_type === 'student');
                const technicians = results.filter(user => user.user_type === 'technician');
                const admin = results.filter(user => user.user_type === 'admin');
                const account_section = results.filter(user => user.user_type === 'account_section');

                return res.status(200).json({
                    data: {
                        students: students,
                        technicians: technicians,
                        admin : admin,
                        account_section : account_section
                    }
                });
            });
        } else {
            return res.status(403).json({ error: 'Forbidden', message: 'You do not have permission to perform this action.' });
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


exports.adminApproveBill = async (req, res) => {
    try {
        const { bill_id, user_type } = req.body; // Assuming admin_id is available in the request

        // Check if bill_id exists
        if (user_type === "admin") {
            const checkBillQuery = `SELECT * FROM bills WHERE bill_id = ?`;
            connection.query(checkBillQuery, [bill_id], async (err, billResults) => {
                if (err) {
                    console.error('Error checking bill: ' + err.stack);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                if (billResults.length === 0) {
                    console.error('Bill not found.');
                    return res.status(404).json({ error: 'Bill not found.' });
                }

                // Query to update the admin_approval column of the bills table
                const approveBillQuery = `UPDATE bills SET admin_approval = true WHERE bill_id = ?`;

                // Fetching technician's email using tech_id
                const fetchTechnicianEmailQuery = `SELECT email FROM technicians WHERE tech_id = (SELECT tech_id FROM bills WHERE bill_id = ?)`;

                // Execute the query to approve the bill
                connection.query(approveBillQuery, [bill_id], async (err, results) => {
                    if (err) {
                        console.error('Error approving bill: ' + err.stack);
                        return res.status(500).json({ error: 'Internal server error' });
                    }

                    // Fetching technician's email
                    connection.query(fetchTechnicianEmailQuery, [bill_id], async (err, technicianResults) => {
                        if (err) {
                            console.error('Error fetching technician email: ' + err.stack);
                            return res.status(500).json({ error: 'Internal server error' });
                        }

                        if (technicianResults.length === 0) {
                            console.error('Technician email not found.');
                            return res.status(404).json({ error: 'Technician email not found.' });
                        }

                        const technicianEmail = technicianResults[0].email;

                        // Send email notification
                        try {
                            const adminEmail = "admin@example.com"; // Replace with admin's email
                            const emailContent = `Bill with ID ${bill_id} has been approved by the admin. Please proceed with the payment process.`;
                            await sendMail(null, null, adminEmail, [technicianEmail], "Bill Approved", emailContent);
                            console.log("Email sent to technician regarding approved bill.");

                            return res.status(200).json({
                                message: `Bill with ID ${bill_id} approved successfully. Email sent to technician.`,
                            });
                        } catch (emailError) {
                            console.error('Error sending email to technician: ' + emailError.stack);
                            return res.status(500).json({ error: 'Internal server error' });
                        }
                    });
                });
            });
        }
        else {
            res.status(401).json({
                success: false,
                data: 'Internal server error',
                message: "Unouthorizes access"
            });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: 'Internal server error',
            message: err.message
        });
    }
};

exports.getAllBillsAdmin = async (req, res) => {
    try {
        const { user_type } = req.body;
        if (user_type === "admin") {
            const getNotApprovedBillsQuery = `SELECT * FROM bills WHERE admin_approval = false and acc_sec_approval = false`;

            connection.query(getNotApprovedBillsQuery, (err, results) => {
                if (err) {
                    console.error('Error fetching not approved bills: ' + err.stack);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                return res.status(200).json({ data: results });
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


exports.addStaff = async (req, res) => {
    try {
        const { userType, data } = req.body;
        let user = "admin";

        if (user === "admin") {
            let tableName, insertQuery, values;

            // Handle different user types here
            switch (userType) {
                case 'student':
                    tableName = 'students';
                    // Query to check if MIS already exists in the database
                    const checkQuery = 'SELECT COUNT(*) AS count FROM students WHERE MIS = ?';
                    connection.query(checkQuery, [data.MIS], (err, result) => {
                        if (err) {
                            console.error('Error checking MIS:', err);
                            return res.status(500).json({ error: 'Internal server error' });
                        }
                        const count = result[0].count;

                        if (count > 0) {
                            // MIS already exists in the database
                            console.log("MIS already registered");
                            return res.status(400).json({ error: 'Bad Request', message: 'MIS already registered' });
                        } else {
                            // MIS is unique, proceed with inserting the new student record
                            insertQuery = 'INSERT INTO students (MIS, password, name, branch, contact_no) VALUES (?, ?, ?, ?, ?)';
                            values = [data.MIS, data.password, data.name, data.branch, data.contact_no];
                            
                            // Execute the insert query
                            connection.query(insertQuery, values, (err, result) => {
                                if (err) {
                                    console.error('Error adding student:', err);
                                    return res.status(500).json({ error: 'Internal server error' });
                                }
                                console.log('Student added successfully');
                                return res.status(200).json({ message: 'Student added successfully' });
                            });
                        }
                    });
                    break;
                case 'technician':
                    tableName = 'technicians';
                    // Query to check if technician ID already exists in the database
                    const checkQueryTech = 'SELECT COUNT(*) AS count FROM technicians WHERE tech_id = ?';
                    connection.query(checkQueryTech, [data.tech_id], (err, result) => {
                        if (err) {
                            console.error('Error checking technician ID:', err);
                            return res.status(500).json({ error: 'Internal server error' });
                        }
                        const count = result[0].count;

                        if (count > 0) {
                            // Technician ID already exists in the database
                            console.log("Technician ID already registered");
                            return res.status(400).json({ error: 'Bad Request', message: 'Technician ID already registered' });
                        } else {
                            // Technician ID is unique, proceed with inserting the new technician record
                            insertQuery = 'INSERT INTO technicians (tech_id, password, name, contact_no, address, city, zip, field , email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
                            values = [data.tech_id, data.password, data.name, data.contact_no, data.address, data.city, data.zip, data.field , data.email];
                            
                            // Execute the insert query
                            connection.query(insertQuery, values, (err, result) => {
                                if (err) {
                                    console.error('Error adding technician:', err);
                                    return res.status(500).json({ error: 'Internal server error' });
                                }
                                console.log('Technician added successfully');
                                return res.status(200).json({ message: 'Technician added successfully' });
                            });
                        }
                    });
                    break;
                case 'admin':
                    tableName = 'admin';
                    // Query to check if username already exists in the database
                    const checkQueryAdmin = 'SELECT COUNT(*) AS count FROM admin WHERE username = ?';
                    connection.query(checkQueryAdmin, [data.username], (err, result) => {
                        if (err) {
                            console.error('Error checking username:', err);
                            return res.status(500).json({ error: 'Internal server error' });
                        }
                        const count = result[0].count;

                        if (count > 0) {
                            // Username already exists in the database
                            console.log("Username already registered");
                            return res.status(400).json({ error: 'Bad Request', message: 'Username already registered' });
                        } else {
                            // Username is unique, proceed with inserting the new admin record
                            insertQuery = 'INSERT INTO admin (name, username, password) VALUES (?, ?, ?)';
                            values = [data.name, data.username, data.password];
                            
                            // Execute the insert query
                            connection.query(insertQuery, values, (err, result) => {
                                if (err) {
                                    console.error('Error adding admin:', err);
                                    return res.status(500).json({ error: 'Internal server error' });
                                }
                                console.log('Admin added successfully');
                                return res.status(200).json({ message: 'Admin added successfully' });
                            });
                        }
                    });
                    break;
                
                case 'account_section':
                    tableName = 'account_section';
                    // Query to check if username already exists in the database
                    const checkQueryAcc = 'SELECT COUNT(*) AS count FROM account_section WHERE username = ?';
                    connection.query(checkQueryAcc, [data.username], (err, result) => {
                        if (err) {
                            console.error('Error checking username:', err);
                            return res.status(500).json({ error: 'Internal server error' });
                        }
                        const count = result[0].count;

                        if (count > 0) {
                            // Username already exists in the database
                            console.log("Username already registered");
                            return res.status(400).json({ error: 'Bad Request', message: 'Username already registered' });
                        } else {
                            // Username is unique, proceed with inserting the new admin record
                            insertQuery = 'INSERT INTO account_section (name, username, password) VALUES (?, ?, ?)';
                            values = [data.name, data.username, data.password];
                            
                            // Execute the insert query
                            connection.query(insertQuery, values, (err, result) => {
                                if (err) {
                                    console.error('Error adding Account Section:', err);
                                    return res.status(500).json({ error: 'Internal server error' });
                                }
                                console.log('Account Section added successfully');
                                return res.status(200).json({ message: 'Admin added successfully' });
                            });
                        }
                    });
                    break;
                default:
                    return res.status(400).json({ error: 'Bad Request', message: 'Invalid user type' });
            }
        } else {
            return res.status(403).json({ error: 'Forbidden', message: 'You do not have permission to perform this action.' });
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

exports.deleteStudent = async (req, res) => {
    try {
        const { MIS } = req.body;
        let user = "admin";

        if (user === "admin") {

     
                            // MIS is unique, proceed with inserting the new student record
                            let deleteQuery = 'DELETE FROM students WHERE MIS= ?'
                            connection.query(deleteQuery, [MIS], (err, results) => {
                                if (err) {
                                    console.error('Error Deleting User: ' + err.stack);
                                    return res.status(500).json({ error: 'Internal server error' });
                                }
                
                                console.log('Retrieved User:', results); // Add logging here to see the results
                
                                return res.status(200).json({
                                    data: results,
                                    message: `User with ${MIS} Delted successfully.`
                
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
                        });
                    }
                };
                

exports.deleteTech = async (req, res) => {
    try {
        const { tech_id } = req.body;
        let user = "admin";

        if (user === "admin") {

     
                            // MIS is unique, proceed with inserting the new student record
                            let deleteQuery = 'DELETE FROM technicians WHERE tech_id= ?'
                            connection.query(deleteQuery, [tech_id], (err, results) => {
                                if (err) {
                                    console.error('Error Deleting User: ' + err.stack);
                                    return res.status(500).json({ error: 'Internal server error' });
                                }
                
                                console.log('Retrieved User:', results); // Add logging here to see the results
                
                                return res.status(200).json({
                                    data: results,
                                    message: `User with ${tech_id} Delted successfully.`
                
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
                        });
                    }
                };
                

exports.deleteAdmin = async (req, res) => {
    try {
        const { username } = req.body;
        let user = "admin";

        if (user === "admin") {

     
                            // MIS is unique, proceed with inserting the new student record
                            let deleteQuery = 'DELETE FROM admin WHERE username= ?'
                            connection.query(deleteQuery, [username], (err, results) => {
                                if (err) {
                                    console.error('Error Deleting User: ' + err.stack);
                                    return res.status(500).json({ error: 'Internal server error' });
                                }
                
                             //   console.log('Retrieved User:', results); // Add logging here to see the results
                
                                return res.status(200).json({
                                    data: results,
                                    message: `User with ${username} Delted successfully.`
                
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
                        });
                    }
                };
                

exports.deleteAcc = async (req, res) => {
    try {
        const { username } = req.body;
        let user = "admin";

        if (user === "admin") {

     
                            // MIS is unique, proceed with inserting the new student record
                            let deleteQuery = 'DELETE FROM account_section WHERE username= ?'
                            connection.query(deleteQuery, [username], (err, results) => {
                                if (err) {
                                    console.error('Error Deleting User: ' + err.stack);
                                    return res.status(500).json({ error: 'Internal server error' });
                                }
                
                                // console.log('Retrieved User:', results); // Add logging here to see the results
                
                                return res.status(200).json({
                                    data: results,
                                    message: `User with ${username} Delted successfully.`
                
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
                        });
                    }
                };
                