const walletRepo = require("../repository/walletRepository");
class WalletService {
    constructor() {
        this.walletRepo = walletRepo;
    }
    async deposit(amount) {
        // Send to repository to update balance
    }

    async withdraw(amount) {
        // Send to repo for update
    }

    async transfer(amount, transferTo) {
        // same procedure, gosh.
    }
}

module.exports = new WalletService();