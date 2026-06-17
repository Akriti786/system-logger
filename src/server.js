require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/db");

const PORT = process.env.PORT || 5000;

(async () => {
    try {
        await sequelize.authenticate();

        console.log("Database Connected");

        await sequelize.sync();

        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });

    } catch (error) {
        console.error("Database Error:", error);
    }
})();