const database = require('../config/database');
class AuthRepository {
    constructor() {
        this.database = database;
    }
    async signin(email) {
        const sql = "SELECT id, email, password FROM users WHERE email = ? LIMIT 1";
        const [rows] = await database.query(sql, [email]);

        return rows[0] || null;
    }

    async signup(username, email, password) {
        const sql = "INSERT INTO users(username, email, password) VALUES (?, ?, ?)";

        const results = await database.query(sql, [username, email, password]);

        return results || null
    }
}

module.exports = new AuthRepository();