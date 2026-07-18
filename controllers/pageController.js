const path = require("path");
class PageController {
    home(req, res) {
        res.sendFile(path.join(process.cwd(), "frontend/index.html"));
    }
    tasks(req, res) {
        res.sendFile(path.join(process.cwd(), "frontend/tasks/index.html"));
    }

    auth(req, res) {
        res.sendFile(path.join(process.cwd(), "frontend/auth/index.html"));
    };

    wallet(req, res) {
        res.sendFile(path.join(process.cwd(), "frontend/wallet/index.html"));
    };

    confirmEmail(req, res) {
        res.sendFile(path.join(process.cwd(), "frontend/confirm-email/index.html"));
    }
    authenticator(req, res) {
        res.sendFile(path.join(process.cwd(), "frontend/auth/authenticator.js"));
    }
}

module.exports = new PageController();