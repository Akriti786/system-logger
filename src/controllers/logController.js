const Log = require("../models/log.model");

const getLogs = async (req, res) => {
    try {
        const logs = await Log.findAll({
            order: [["id", "DESC"]]
        });

        res.json(logs);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { getLogs };