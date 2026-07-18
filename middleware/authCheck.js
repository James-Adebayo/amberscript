const jwt = require("jsonwebtoken");
class AuthCheck {
    async authenticate(req, res, next) {
        const token = req.cookies.token;

        if (!token) {
            // return res.redirect(301, '/auth');
            return res.status(401).send({ success: false, error: "unauthorized" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).send({ success: false, error: "Invalid token" });
        }
    }

    async authenticatePage(req, res, next) {
        const token = req.cookies.token;

        if (!token) {
            return res.redirect('/auth');
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            return res.redirect('/auth');
        }
    }
}

module.exports = new AuthCheck();