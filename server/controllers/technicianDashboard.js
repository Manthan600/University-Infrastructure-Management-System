let connection;

exports.setup = (database) => {
    console.log(connection, " connection reaches technicians page");
    connection = database;
}


exports.getAllComplaints = async (req,res) =>{
    try{
        const{tech_type, user_type} = req.body;
        if (user_type === "technician"){
            let DEVICE_TABLE_NAME;
            let DEVICE_ID;
            let DEVICE_COMPLAINTS;

            if (tech_type === "computer"){
                DEVICE_TABLE_NAME = "computer";
                DEVICE_ID = "comp_id";
                DEVICE_COMPLAINTS = "comp_complaints";                
            }
            else if (tech_type === "ac"){
                DEVICE_TABLE_NAME = "ac";
                DEVICE_ID = "ac_id";
                DEVICE_COMPLAINTS = "ac_complaints";                
            }
            else if (tech_type === "projector"){
                DEVICE_TABLE_NAME = "projector";
                DEVICE_ID = "proj_id";
                DEVICE_COMPLAINTS = "proj_complaints";                
            }

            get_complaints_query = `SELECT dc.token_id , dc.description , dc.${DEVICE_ID}, dc.complaint_date, dt.Company FROM ${DEVICE_COMPLAINTS} dc JOIN ${DEVICE_TABLE_NAME} dt on dc.${DEVICE_ID} = dt.${DEVICE_ID} WHERE dc.tech_id IS NULL AND dc.admin_approval = true; `

            connection.query(get_complaints_query, [] , (err, results) => {
                if (err){
                    console.error('Error retriving complaints: ' + err.stack);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                return res.status(200).json({
                    data : results
                });
            })
                
            
        }
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            data: 'Internal server error ',
            message: err.message
        })
    }
};

exports.acceptComplaints = async (req,res) =>{
    try{
        const{tech_type, user_type, token_id , tech_id} = req.body;
        if (user_type === "technician"){
            let DEVICE_TABLE_NAME;
            let DEVICE_ID;
            let DEVICE_COMPLAINTS;

            if (tech_type === "computer"){
                DEVICE_TABLE_NAME = "computer";
                DEVICE_ID = "comp_id";
                DEVICE_COMPLAINTS = "comp_complaints";                
            }
            else if (tech_type === "ac"){
                DEVICE_TABLE_NAME = "ac";
                DEVICE_ID = "ac_id";
                DEVICE_COMPLAINTS = "ac_complaints";                
            }
            else if (tech_type === "projector"){
                DEVICE_TABLE_NAME = "projector";
                DEVICE_ID = "proj_id";
                DEVICE_COMPLAINTS = "proj_complaints";                
            }

            const accept_complaints_query = `UPDATE ${DEVICE_COMPLAINTS} SET tech_id = ? WHERE token_id = ?`

            connection.query(accept_complaints_query, [tech_id , token_id] , (err, results) => {
                if (err){
                    console.error('Error accepting complaints: ' + err.stack);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                return res.status(200).json({
                    data : results,
                    message: `complaint with ${token_id} accepted successfully.`
                });
            })
                
            
        }
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            data: 'Internal server error ',
            message: err.message
        })
    }
};

exports.resolveComplaints = async (req,res) =>{
    try{
        const{tech_type, user_type, token_id , tech_id, bill} = req.body;
        if (user_type === "technician"){
            let DEVICE_TABLE_NAME;
            let DEVICE_ID;
            let DEVICE_COMPLAINTS;

            if (tech_type === "computer"){
                DEVICE_TABLE_NAME = "computer";
                DEVICE_ID = "comp_id";
                DEVICE_COMPLAINTS = "comp_complaints";                
            }
            else if (tech_type === "ac"){
                DEVICE_TABLE_NAME = "ac";
                DEVICE_ID = "ac_id";
                DEVICE_COMPLAINTS = "ac_complaints";                
            }
            else if (tech_type === "projector"){
                DEVICE_TABLE_NAME = "projector";
                DEVICE_ID = "proj_id";
                DEVICE_COMPLAINTS = "proj_complaints";                
            }

            const resolve_complaints_query = `DELETE FROM ${DEVICE_COMPLAINTS} WHERE token_id = ?`

            connection.query(resolve_complaints_query, [token_id] , (err, results) => {
                if (err){
                    console.error('Error resolving complaints: ' + err.stack);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                return res.status(200).json({
                    data : results,
                    message: `complaint with ${token_id} resolved successfully.`
                });
            })
                
            
        }
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            data: 'Internal server error ',
            message: err.message
        })
    }
};