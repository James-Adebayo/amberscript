const authService = require('../services/authService');
class AuthController {
    async signin (req, res) {
        const {email, password} = req.body;
        const result = await authService.signin(email, password);
        if (result.success === false){
            return res.status(400).send({success: false, error: result.message});
        }

        res.status(200).send({success: true, message: result.message, redirectTo: '/wallet'});
    }

    async signup (req, res){
        const {email, password} = req.body;

        const result = await authService.signup(email, password);
        if (result.success === false){
            return res.status(400).send({success: false, error: result.message});
        }

        res.status(200).send({success: true, message: result.message, redirectTo: '/confirm-email'});
    }
}

module.exports = new AuthController();