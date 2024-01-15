const mysql = require('mysql');

class DATABASE {
    constructor(DBINFO) {
        this.connection =  mysql.createConnection(DBINFO);
    }

    connect = () => this.connection.connect();
  
    sendQuery = (command) => {
        return new Promise((resolve) => {
            this.connection.query(command, (err, result) => {
                if (err) return console.log(err);
                resolve(result);
            })
        });
    };

    fetchData = () => {
        const query = "SELECT * FROM results";
        return new Promise((resolve) => {
            this.connection.query(query, (err, result) => {
                if (err) return console.log(err);
                resolve(result);
            })
        });
    };
}

const host = "151.30.105.67";
const user = "dev";
const password = "260207";
const database = "olix-tests";

const DB = new DATABASE({
  host,
  user,
  password,
  database,
});

DB.connect(); // called by default so that you don't have to :)

/**
 * const result = await DB.fetchData();
 * @returns {Array} result
 */

module.exports = DB;