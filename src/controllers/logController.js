const logModel = require("../models/logModel");

const getLogs = async (req, res) => {
    try {
        const logs = await logModel.getAllLogs();
        res.json(logs);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getLogs
};