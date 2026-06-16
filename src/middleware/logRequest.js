const pool = require("../config/db");
const si = require("systeminformation");

const logRequest = (req, res, next) => {
    const start = Date.now();

    res.on("finish", async () => {
        try {
            const duration = Date.now() - start;

            const [system, osInfo, mem, cpu] = await Promise.all([
                si.system(),
                si.osInfo(),
                si.mem(),
                si.cpu()
            ]);

            const systemInfo = {
                manufacturer: system.manufacturer,
                model: system.model,
                hostname: osInfo.hostname,
                platform: osInfo.platform,
                distro: osInfo.distro,
                arch: osInfo.arch,
                totalMemory: mem.total,
                freeMemory: mem.free,
                cpuManufacturer: cpu.manufacturer,
                cpuBrand: cpu.brand,
                cpuCores: cpu.cores
            };

            await pool.query(
                `
                INSERT INTO user_logs
                (
                    timestamp,
                    method,
                    path,
                    status,
                    duration,
                    user_agent,
                    ip,
                    owner,
                    system_info
                )
                VALUES
                ($1,$2,$3,$4,$5,$6,$7,$8,$9)
                `,
                [
                    new Date(),
                    req.method,
                    req.path,
                    res.statusCode,
                    `${duration}ms`,
                    req.headers["user-agent"],
                    req.ip,
                    "anonymous",
                    JSON.stringify(systemInfo)
                ]
            );
        } catch (error) {
            console.error(error);
        }
    });

    next();
};

module.exports = logRequest;