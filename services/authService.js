const authRepo = require('../repository/authRepository');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
class AuthService {
    constructor() {
        this.authRepo = authRepo;
    }
    async signin(email, password) {
        try {
            if (!email && !password) return { error: "Email and password empty" };
            if (!email) return { error: "Email empty" };
            if (!password) return { error: "Password empty" };

            const user = await this.authRepo.signin(email);
            if (!user) return { error: "Invalid Credentials" };

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return { error: "Invalid credentials" };

            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return { message: "Sign in successful", token: token };
        } catch (error) {
            return { error: `Sign in failed: ${error.message}` };
        }
    }

    async signup(username, email, password) {
        try {
            if (!username && !email && !password) return { error: "Email and password empty" };
            if (!username) return { error: "Username empty" };
            if (!email) return { error: "Email empty" };
            if (!password) return { error: "Password empty" };

            const passwordHash = await bcrypt.hash(password, 10);

            const user = await this.authRepo.signup(username, email, passwordHash);
            if (!user) return { error: "account creation failed" };

            return { message: "Sign up successful" };
        } catch (error) {
            return { error: `Sign up failed: ${error.message}` };
        }
    }
}

module.exports = new AuthService();