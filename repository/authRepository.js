const database = require('../config/database');
class AuthRepository {
    constructor() {
        this.database = database;
    }
    async signin(email) {
        try {
            const sql = "SELECT id, email, password FROM users WHERE email = ? LIMIT 1";
            const [rows] = await database.query(sql, [email]);
            return rows[0] || null;
        } catch (error) {
            throw new Error(`signin query failed: ${error.message}`);
        }
    }

    async signup(username, email, password) {
        try {
            const sql = "INSERT INTO users(username, email, password) VALUES (?, ?, ?)";
            const results = await database.query(sql, [username, email, password]);
            return results || null;
        } catch (error) {
            throw new Error(`signup query failed: ${error.message}`);
        }
    }
}

module.exports = new AuthRepository();