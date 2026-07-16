const path = require("path");
class PageController {
    home(req, res) {
        res.sendFile(path.join(__dirname, "../frontend/index.html"));
    }
    tasks(req, res) {
        res.sendFile(path.join(__dirname, "../frontend/tasks/index.html"));
    }

    auth(req, res) {
        res.sendFile(path.join(__dirname, "../frontend/auth/index.html"));
    };

    wallet(req, res) {
        res.sendFile(path.join(__dirname, "../frontend/wallet/index.html"));
    };

    confirmEmail(req, res) {
        res.sendFile(path.join(__dirname, "../frontend/confirm-email/index.html"))
    }
}

module.exports = new PageController();