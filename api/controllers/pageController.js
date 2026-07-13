const path = require("path");

exports.home = (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
};
exports.tasks = (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/tasks/index.html"));
};
exports.auth = (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/auth/index.html"));
};
exports.wallet = (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/wallet/index.html"));
};