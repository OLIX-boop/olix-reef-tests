import mysql, { Connection } from 'mysql';

class DATABASE {

    connection:Connection;

    constructor(DBINFO:object) {
        this.connection =  mysql.createConnection(DBINFO);
    }

    connect = () => this.connection.connect();
  
    sendQuery = (command:string) => {
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

const host:string = "151.30.105.67";
const user:string = "dev";
const password:string = "260207";
const database:string = "olix-tests";

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

export default DB;