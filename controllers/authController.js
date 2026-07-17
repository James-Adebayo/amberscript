const authService = require('../services/authService');
class AuthController {
    constructor() {
        this.authService = authService;
    }
    async signin(req, res) {
        try {
            const { email, password } = req.body;
            const result = await authService.signin(email, password);
            if (result.error) {
                return res.status(400).send({ success: false, error: result.error });
            }

            res.cookie('token', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 1000
            });
            res.status(200).send({ success: true, message: result.message, redirectTo: '/wallet' });
        } catch (error) {
            res.status(500).send({ success: false, error: 'Internal server error' });
        }
    }

    async signup(req, res) {
        try {
            const { username, email, password } = req.body;
            const result = await authService.signup(username, email, password);
            if (result.error) {
                return res.status(400).send({ success: false, error: result.error });
            }

            res.status(200).send({ success: true, message: result.message, redirectTo: '/confirm-email' });
        } catch (error) {
            res.status(500).send({ success: false, error: 'Internal server error' });
        }
    }
}

module.exports = new AuthController();