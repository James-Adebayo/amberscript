const database = require('../config/database');
class AuthRepository {
    constructor() {
        this.database = database;
    }
    async signin(email) {
        const sql = "SELECT id, email, password FROM users WHERE email = ? LIMIT 1";
        const [rows] = await database.query(sql, [email]);

        if (rows.length === 0) {
            return {
                success: false,
                message: "User not found"
            }
        };

        const user = rows[0];
        if (!user) {
            return { success: false, message: 'user not found' };
        }

        return { success: true, message: user };
    }
}

module.exports = new AuthRepository();