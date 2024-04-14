const sendMail = require("../config/mail");
let connection;

exports.setup = (database) => {
    console.log(connection, " connection reaches technicians page");
    connection = database;
}




// exports.getAllComplaints = async (req, res) => {
//     try {
//         // const { user_type, tech_id } = req.body;
//         const tech_id = 110002;
//         const tech_type = "computer"; // Hardcoded for testing
//         user_type = "technician";

//         if (user_type === "technician") {
//             let DEVICE_TABLE_NAME;
//             let DEVICE_ID;
//             let DEVICE_COMPLAINTS;

//             if (tech_type === "computer") {
//                 DEVICE_TABLE_NAME = "computer";
//                 DEVICE_ID = "comp_id";
//                 DEVICE_COMPLAINTS = "comp_complaints";

//             } else if (tech_type === "ac") {
//                 DEVICE_TABLE_NAME = "ac";
//                 DEVICE_ID = "ac_id";
//                 DEVICE_COMPLAINTS = "ac_complaints";
//             } else if (tech_type === "projector") {

//                 DEVICE_TABLE_NAME = "projector";
//                 DEVICE_ID = "proj_id";
//                 DEVICE_COMPLAINTS = "proj_complaints";
//             }

//             const get_complaints_query = `
//                 SELECT dc.token_id, dc.description, dc.${DEVICE_ID}, dc.complaint_date, dt.Company, dc.student_id ,dc.resolved_date,dc.tech_id
//                 FROM ${DEVICE_COMPLAINTS} dc 
//                 JOIN ${DEVICE_TABLE_NAME} dt ON dc.${DEVICE_ID} = dt.${DEVICE_ID} 
//                 WHERE (dc.tech_id IS NULL or dc.tech_id= ? ) AND dc.admin_approval = true;
//             `;


//             connection.query(get_complaints_query, [tech_id], (err, results) => {
//                 if (err) {
//                     console.error('Error retrieving complaints: ' + err.stack);

//                     return res.status(500).json({ error: 'Internal server error' });
//                 }

//                 console.log('Retrieved complaints:', results); // Add logging here to see the results

//                 return res.status(200).json({
//                     data: results
//                 });
//             })


//         }
//     }

//            catch (err) {

//         console.error(err);
//         res.status(500).json({
//             success: false,
//             data: 'Internal server error',
//             message: err.message
//         });
//     }
// };



exports.getAllComplaints = async (req, res) => {
    try {
        const { user_type, tech_id ,tech_type} = req.query;
        // console.log( { user_type, tech_id ,tech_type});
        
        // const tech_id = 110002;
        // const tech_type = "computer"; // Hardcoded for testing
        // user_type = "technician";

        if (user_type === "technician") {
            let DEVICE_TABLE_NAME;
            let DEVICE_ID;
            let DEVICE_COMPLAINTS;

            if (tech_type === "computer") {
                DEVICE_TABLE_NAME = "computer";
                DEVICE_ID = "comp_id";
                DEVICE_COMPLAINTS = "comp_complaints";
            } else if (tech_type === "ac") {
                DEVICE_TABLE_NAME = "ac";
                DEVICE_ID = "ac_id";
                DEVICE_COMPLAINTS = "ac_complaints";
            } else if (tech_type === "projector") {
                DEVICE_TABLE_NAME = "projector";
                DEVICE_ID = "proj_id";
                DEVICE_COMPLAINTS = "proj_complaints";
            }

            const get_complaints_query = `
                SELECT dc.token_id, dc.description, dc.${DEVICE_ID} as device_id, dc.complaint_date, dt.Company, dc.student_id ,dc.resolved_date,dc.tech_id
                FROM ${DEVICE_COMPLAINTS} dc 
                JOIN ${DEVICE_TABLE_NAME} dt ON dc.${DEVICE_ID} = dt.${DEVICE_ID} 
                WHERE  dc.admin_approval = true;
            `;

            connection.query(get_complaints_query, [tech_id], (err, results) => {
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


// exports.acceptComplaints = async (req, res) => {
//     try {
//         const { tech_type, user_type, token_id, tech_id } = req.body;

//         if (user_type === "technician") {
//             let DEVICE_TABLE_NAME;
//             let DEVICE_ID;
//             let DEVICE_COMPLAINTS;

//             if (tech_type === "computer") {
//                 DEVICE_TABLE_NAME = "computer";
//                 DEVICE_ID = "comp_id";
//                 DEVICE_COMPLAINTS = "comp_complaints";
//             }
//             else if (tech_type === "ac") {
//                 DEVICE_TABLE_NAME = "ac";
//                 DEVICE_ID = "ac_id";
//                 DEVICE_COMPLAINTS = "ac_complaints";
//             }
//             else if (tech_type === "projector") {
//                 DEVICE_TABLE_NAME = "projector";
//                 DEVICE_ID = "proj_id";
//                 DEVICE_COMPLAINTS = "proj_complaints";
//             }

//             const accept_complaints_query = `UPDATE ${DEVICE_COMPLAINTS} SET tech_id = ? WHERE token_id = ?`;

//           connection.query(accept_complaints_query, [tech_id, token_id], async (err, results) => {
//                 if (err) {
//                     console.error('Error accepting complaints: ' + err.stack);
//                     return res.status(500).json({ error: 'Internal server error' });
//                 }

//             // If no rows were affected, return success without sending email
//                 if (results.affectedRows === 0) {
//                     return res.status(200).json({
//                         data: results,
//                         message: `No such complaint exists. Wrong token_id.`,
//                     });
//                 }

//                 // Fetch technician's details
//                 const fetchTechnicianDetailsQuery = `SELECT name, contact_no FROM technicians WHERE tech_id = ?`;
//                 connection.query(fetchTechnicianDetailsQuery, [tech_id], async (err, technicianResults) => {
//                     if (err) {
//                         console.error('Error fetching technician details: ' + err.stack);
//                         return res.status(500).json({ error: 'Internal server error' });
//                     }

//                     if (technicianResults.length === 0) {
//                         console.error('Technician details not found.');
//                         return res.status(404).json({ error: 'Technician details not found.' });
//                     }

//                     const technicianName = technicianResults[0].name;
//                     const technicianMobile = technicianResults[0].contact_no;

//                     // Send email to admin regarding accepted complaint
//                     try {
//                         const adminEmail = "admin@example.com";
//                         const emailContent = `Complaint with token ID ${token_id} has been accepted by technician ${technicianName} (Mobile: ${technicianMobile}).`;
//                         await sendMail(null, null, "Technician", [adminEmail], "Complaint Accepted", emailContent);
//                         console.log("Email sent to admin regarding accepted complaint.");

//                         return res.status(200).json({
//                             data: results,
//                             message: `Complaint with ${token_id} accepted successfully. Email sent to admin.`,
//                         });
//                     } catch (emailError) {
//                         console.error('Error sending email to admin but complaint accepted by technician: ' + emailError.stack);
//                         return res.status(500).json({ error: 'Internal server error' });
//                     }
//                 });
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
// };


exports.acceptComplaints = async (req, res) => {
    try {
        const { tech_type, user_type, token_id, tech_id } = req.body;

        if (user_type === "technician") {
            let DEVICE_TABLE_NAME;
            let DEVICE_ID;
            let DEVICE_COMPLAINTS;

            if (tech_type === "computer") {
                DEVICE_TABLE_NAME = "computer";
                DEVICE_ID = "comp_id";
                DEVICE_COMPLAINTS = "comp_complaints";
            }
            else if (tech_type === "ac") {
                DEVICE_TABLE_NAME = "ac";
                DEVICE_ID = "ac_id";
                DEVICE_COMPLAINTS = "ac_complaints";
            }
            else if (tech_type === "projector") {
                DEVICE_TABLE_NAME = "projector";
                DEVICE_ID = "proj_id";
                DEVICE_COMPLAINTS = "proj_complaints";
            }

            const accept_complaints_query = `UPDATE ${DEVICE_COMPLAINTS} SET tech_id = ? WHERE token_id = ?`

            connection.query(accept_complaints_query, [tech_id, token_id], (err, results) => {
                if (err) {
                    console.error('Error accepting complaints: ' + err.stack);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                return res.status(200).json({
                    data: results,
                    message: `complaint with ${token_id} accepted successfully.`
                });
            })


        }
    }
    catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json({})
    }
}

exports.getAllBillsStatus = async (req, res) => {
    try {
        console.log("in tech bills");
        const { user_type,tech_id } = req.body;
        console.log(tech_id);
        if (1==1) {
            const getBillsQuery = `SELECT * FROM bills WHERE tech_id=?`;

            connection.query(getBillsQuery ,[tech_id],(err, results) => {
                if (err) {
                    console.error('Error fetching bills status: ' + err.stack);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                // console.log("Results:" ,results)

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

 

exports.resolveComplaints = async (req, res) => {
    try {

      const { tech_type, user_type, token_id, tech_id, bill_description, total_bill } = req.body;
        if (user_type === "technician") {
            let DEVICE_TABLE_NAME;
            let DEVICE_ID;
            let DEVICE_COMPLAINTS;

            if (tech_type === "computer") {
                DEVICE_TABLE_NAME = "computer";
                DEVICE_ID = "comp_id";
                DEVICE_COMPLAINTS = "comp_complaints";
            }
            else if (tech_type === "ac") {
                DEVICE_TABLE_NAME = "ac";
                DEVICE_ID = "ac_id";
                DEVICE_COMPLAINTS = "ac_complaints";
            }
            else if (tech_type === "projector") {
                DEVICE_TABLE_NAME = "projector";
                DEVICE_ID = "proj_id";
                DEVICE_COMPLAINTS = "proj_complaints";
            }

            // Fetch device_id from DEVICE_COMPLAINTS table based on token_id
            
            const resolve_complaints_query = `UPDATE ${DEVICE_COMPLAINTS} SET resolved_date =CURRENT_DATE() WHERE token_id = ?`

            connection.query(resolve_complaints_query, [token_id], (err, results) => {
                if (err) {
                    console.error('Error resolving complaints: ' + err.stack);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                
            const fetchDeviceIdQuery = `SELECT ${DEVICE_ID} FROM ${DEVICE_COMPLAINTS} WHERE token_id = ?`;
            connection.query(fetchDeviceIdQuery, [token_id], async (err, deviceResults) => {
                if (err) {
                    console.error('Error fetching device_id: ' + err.stack);
                    return res.status(500).json({ error: 'Internal server error1' });
                }

                if (deviceResults.length === 0) {
                    console.error('Device details not found for the given token_id.');
                    return res.status(404).json({ error: 'Device details not found for the given token_id.' });
                }

                const firstKey = Object.keys(deviceResults[0])[0];
                const firstValue = deviceResults[0][firstKey]
                const device_id = firstValue;

                // Insert details into the bills table
                const insertBillQuery = `INSERT INTO bills (tech_id, token_id, device_type, description, total_bill, device_id) VALUES (?, ?, ?, ?, ?, ?)`;
                
                console.log("hello : " ,  [tech_id, token_id, tech_type, bill_description, total_bill, device_id]);


                connection.query(insertBillQuery, [tech_id, token_id, tech_type, bill_description, total_bill, device_id], async (err, result) => {

                    if (err) {
                        console.error('Error inserting bill details: ' + err.stack);
                        return res.status(500).json({ error: 'Internal server error' });
                    }
                    try {
                        const adminEmail = "admin@example.com";
                        const emailContent = `Complaint with token ID ${token_id} has been resolved by technician ${tech_id}.`;
                        await sendMail(null, null, "Technician", [adminEmail], "Complaint Resolved", emailContent);
                        console.log("Email sent to admin regarding resolved complaint.");

                        return res.status(200).json({
                            // data: deleteResults,
                            message: `Complaint with ${token_id} resolved successfully. Email sent to admin.`,
                        });
                    } catch (emailError) {
                        console.log(emailError.message);
                        console.error('Error sending email to admin but complaint resolved by technician: ' + emailError.stack);
                        return res.status(500).json({ error: 'Internal server error2' });
                    }
                        
                    // });
                });
            });

                    // return res.status(200).json({
                    // data: results,
                    // message: `complaint with ${token_id} resolved successfully.`
                // });
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
        });
    }
};

// Import required modules


// Endpoint to approve a bill