let connection;

exports.setup = (database) => {
    console.log(connection, " connection reaches login page");
    connection = database;
}

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        const query = 'SELECT mis,name FROM students WHERE MIS = ? AND password = ?';

        // Execute the query
        connection.query(query, [username, password], (err, results) => {
            if (err) {
                console.error('Error executing query: ' + err.stack);
                return res.status(500).json({ error: 'Internal server error' });
            }

            // Check if user exists
            if (results.length === 0) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }
            // User authenticated successfully
            res.status(200).json({
                message: 'Login successful',
                data: results,
                user_type: 'normal'
            });
        });

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


exports.loginTechnician = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const query = 'SELECT tech_id,name, field FROM technicians WHERE tech_id = ? AND password = ?';

        // Execute the query
        connection.query(query, [username, password], (err, results) => {
            if (err) {
                console.error('Error executing query: ' + err.stack);
                return res.status(500).json({ error: 'Internal server error' });
            }

            // Check if user exists
            if (results.length === 0) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }
            // User authenticated successfully
            res.status(200).json({
                message: 'Login successful',
                data: results,
                user_type: 'technician'
            });
        });

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



exports.loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        const query = 'SELECT username,name FROM admin WHERE username = ? AND password = ?';

        // Execute the query
        connection.query(query, [username, password], (err, results) => {
            if (err) {
                console.error('Error executing query: ' + err.stack);
                return res.status(500).json({ error: 'Internal server error' });
            }

            // Check if user exists
            if (results.length === 0) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }
            // User authenticated successfully
            res.status(200).json({
                message: 'Login successful',
                data: results,
                user_type: 'admin',
            });
        });

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



exports.loginAccountSection = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        const query = 'SELECT username,name FROM account_section WHERE username = ? AND password = ?';

        // Execute the query
        connection.query(query, [username, password], (err, results) => {
            if (err) {
                console.error('Error executing query: ' + err.stack);
                return res.status(500).json({ error: 'Internal server error' });
            }

            // Check if user exists
            if (results.length === 0) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }
            // User authenticated successfully
            res.status(200).json({
                message: 'Login successful',
                data: results,
                user_type: 'accounts',
            });
        });

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