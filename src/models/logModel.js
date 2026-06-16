const pool = require("../config/db");

const getAllLogs = async () => {
    const result = await pool.query(
        "SELECT * FROM user_logs ORDER BY id DESC"
    );

    return result.rows;
};

module.exports = {
    getAllLogs
};