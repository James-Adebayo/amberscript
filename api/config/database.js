const mysql = require('mysql2/promise');

class Database{
    constructor(){
        this.pool = mysql.createPool({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE_NAME
        });
    }

    query(sql, params){
        return this.pool.execute(sql, params);
    }
}

module.exports = new Database();