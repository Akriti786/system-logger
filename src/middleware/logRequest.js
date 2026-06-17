const Log = require("../models/log.model");
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

            await Log.create({
                timestamp: new Date(),
                method: req.method,
                path: req.path,
                status: res.statusCode,
                duration: `${duration}ms`,
                user_agent: req.headers["user-agent"],
                ip: req.ip,
                owner: "anonymous",
                system_info: systemInfo
            });

        } catch (error) {
            console.error(error);
        }
    });

    next();
};

module.exports = logRequest;