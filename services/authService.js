const authRepo = require('../repository/authRepository');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
class AuthService {
    constructor() {
        this.authRepo = authRepo;
    }
    async signin(email, password) {
        if (!email && !password) return { error: "Email and password empty" };
        if (!email) return { error: "Email empty" };
        if (!password) return { error: "Password empty" };

        const user = await this.authRepo.signin(email);
        if (!user) {
            return { error: "Invalid Credentials" }
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return { error: "Invalid credentials" };

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: 'strict',
        //     maxAge: 60 * 60 * 1000
        // });
        return { message: "Sign in successful", token: token };
    }

    async signup(username, email, password) {
        if (!username && !email && !password) return { error: "Email and password empty" };
        if (!username) return { error: "Username empty" };
        if (!email) return { error: "Email empty" };
        if (!password) return { error: "Password empty" };

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await this.authRepo.signup(username, email, passwordHash);
        if (!user) return { error: "account creation failed" };

        return { message: "Sign up successful" };
    }
}

module.exports = new AuthService();