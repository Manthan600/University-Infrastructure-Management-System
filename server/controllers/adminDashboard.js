let connection;

exports.setup = (database) => {
    console.log(connection, " connection reaches admin page");
    connection = database;
}




exports.getAllComplaintsAdmin = async (req, res) => {
    try {
        // const { token_id, device_type, user_type } = req.body;
        user_type = "admin";
        token_id = 1;
        device_type = 'computer'

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
                SELECT dc.token_id, dc.description, dc.${DEVICE_ID}, dc.complaint_date, dt.Company, dc.student_id ,dc.resolved_date,dc.tech_id,dc.admin_approval
                FROM ${DEVICE_COMPLAINTS} dc 
                JOIN ${DEVICE_TABLE_NAME} dt ON dc.${DEVICE_ID} = dt.${DEVICE_ID} 
               ;
            `;

            connection.query(get_complaints_query, [token_id], (err, results) => {
                if (err) {
                    console.error('Error retrieving complaints: ' + err.stack);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                console.log('Retrieved complaints:', results); // Add logging here to see the results

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

                console.log('Retrieved complaints:', results); // Add logging here to see the results

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

                console.log('Retrieved complaints:', results); // Add logging here to see the results

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



exports.getAllDevices = async (req, res) => {
    try {
        // const {  device_type, user_type } = req.body;
        user_type = "admin";
        // device_type='computer'

        if (user_type === "admin") {
            let DEVICE_TABLE_NAME;

            if (device_type === "computer") {
                DEVICE_TABLE_NAME = "computer";

            } else if (device_type === "ac") {
                DEVICE_TABLE_NAME = "ac";


            } else if (device_type === "projector") {
                DEVICE_TABLE_NAME = "projector";

            }

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

                console.log('Retrieved All devices:', results); // Add logging here to see the results

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




// exports.getAllUsers = async (req, res) => {
//     try {
//         // const {   user_type } = req.body;
//         user_type= "admin";
//         staff_type='student'

//         if (user_type === "admin") {
//             let STAFF_TABLE_NAME;

//             if (staff_type === "student") {
//                 STAFF_TABLE_NAME = "students";

//             } else if (device_type === "technician") {
//                 STAFF_TABLE_NAME = "technicians";

//             }

//             // const get_devices_query = `
//             //     SELECT *
//             //     FROM ${DEVICE_TABLE_NAME}  
//             //    ;

//             //select * causing variable overwritting in device_id printing

//             const get_users_query = `
//             SELECT 'student' AS user_type, MIS, password, name, branch, contact_no, NULL AS address, NULL AS city, NULL AS zip, NULL AS field 
// FROM students
// UNION
// SELECT 'technician' AS user_type, tech_id AS MIS, password, name, contact_no, address, city, zip, field 
// FROM technicians;


//             `;

//             connection.query(get_users_query, (err, results) => {
//                 if (err) {
//                     console.error('Error retrieving users: ' + err.stack);
//                     return res.status(500).json({ error: 'Internal server error' });
//                 }

//                 console.log('Retrieved All Users:', results); // Add logging here to see the results

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


exports.getAllUsers = async (req, res) => {
    try {
        const user_type = "admin"; // Assuming user_type is hardcoded for now

        if (user_type === "admin") {
            const get_users_query = `
                SELECT 'student' AS user_type, MIS, password, name, branch, contact_no, null AS address, null AS city, null AS zip, null AS field FROM students
                UNION
                SELECT 'technician' AS user_type, tech_id, password, name, null AS branch, contact_no, address, city, zip, field FROM technicians;
            `;

            connection.query(get_users_query, (err, results) => {
                if (err) {
                    console.error('Error retrieving users:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                const students = results.filter(user => user.user_type === 'student');
                const technicians = results.filter(user => user.user_type === 'technician');

                return res.status(200).json({
                    data: {
                        students: students,
                        technicians: technicians
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