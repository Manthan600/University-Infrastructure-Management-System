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


exports.addComputer = async (req,res) => {
    try{
        const { new_model , device_type, user_type, } =req.body;
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