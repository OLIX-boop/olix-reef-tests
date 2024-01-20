import mysql, { Connection } from 'mysql';

class DATABASE {

    connection:Connection;

    constructor(DBINFO:object) {
        this.connection =  mysql.createConnection(DBINFO);
    }

    connect = ():void => this.connection.connect();
  
    sendQuery = (command:string):Promise<object> => {
        return new Promise((resolve) => {
            this.connection.query(command, (err, result) => {
                if (err) return console.log(err);
                resolve(result);
            })
        });
    };

    fetchData = ():Promise<object> => {
        const query:string = "SELECT * FROM results";
        return new Promise((resolve) => {
            this.connection.query(query, (err, result) => {
                if (err) return console.log(err);
                resolve(result);
            })
        });
    };

    insertNewTest = ():Promise<object> => {
        const query = `INSERT INTO results SET ?`;
        const params = {
            edited : false
        };
        return new Promise((resolve) => {
            this.connection.query(query, params, (err, result) => {
                if (err) return console.log(err);
                resolve(result);
            })
        });
    };

}

const host:string = "151.30.143.166";
const user:string = "dev";
const password:string = "260207";
const database:string = "olix-tests";

const DB:DATABASE = new DATABASE({
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