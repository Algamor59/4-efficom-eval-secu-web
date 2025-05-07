const fs = require('fs');
const path = require('path');


const blacklistPath = path.join(__dirname, 'blacklist.json');
let blacklist = [];

try {
    blacklist = JSON.parse(fs.readFileSync(blacklistPath));
} catch (err) {
    console.error("Impossible de charger la blacklist :", err.message);
}

const ipBlocker = (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    if (blacklist.includes(ip)) {
        return res.status(403).json({ error: "Votre IP est bloquée." });
    }
    next();
};

app.use(ipBlocker);
