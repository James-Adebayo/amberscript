const walletService = require("../services/walletService");

class WalletController {
    constructor() {
        this.walletService = walletService;
    }

    async deposit(req, res) {
        const { amount } = req.body;
        const result = await walletService.deposit(amount);
        if (result.success === false) {
            res.status(401).send({ success: false, error: result.message });
        };

        res.status(200).send({ success: true, message: result.message });
    }

    async withdraw(req, res) {
        const { amount } = req.body;
        const result = await walletService.withdraw(amount);
        if (result.error) {
            res.status(401).send({ success: false, error: result.error });
        };

        res.status(200).send({ success: true, message: result.message });
    }

    async transfer(req, res) {
        const { amount, transferTo } = req.body;
        const result = await walletService.transfer(amount, transferTo);
        if (result.error) {
            res.status(401).send({ success: false, error: result.error });
        };

        res.status(200).send({ success: true, message: result.message });
    }
}

module.exports = new WalletController();