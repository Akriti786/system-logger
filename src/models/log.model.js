const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Log = sequelize.define(
    "Log",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false
        },
        method: {
            type: DataTypes.STRING,
            allowNull: false
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        duration: {
            type: DataTypes.STRING
        },
        user_agent: {
            type: DataTypes.TEXT
        },
        ip: {
            type: DataTypes.STRING
        },
        owner: {
            type: DataTypes.STRING,
            defaultValue: "anonymous"
        },
        system_info: {
            type: DataTypes.JSONB
        }
    },
    {
        tableName: "user_logs",
        timestamps: false
    }
);

module.exports = Log;