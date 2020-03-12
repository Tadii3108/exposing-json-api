//configurations for connections

const Pool  = require('pg').Pool;
const pool = new Pool ({
    user: "user",
    host: "localhost",
    database: "db",
    password: "pass",
    port: 5432
 });

/*const createTable = async(tableName) => {
    const tadi = await pool.connect();
    const res = await pool.query(`DROP TABLE IF EXISTS ${tableName};
    CREATE TABLE ${tableName} (id SERIAL PRIMARY KEY, visitor_name varchar(100), visitor_age int, date_of_visit text,time_of_visit time,assistant varchar(100),comments text);`);
    tadi.release()
    console.log(`${tableName} table created`);
    return res.rowCount;
}*/

const addNewVisitor = async(visitor_name, visitor_age, date_of_visit, time_of_visit, assistant, comments) => {
    return new Promise(async(resolve, reject) => {
        await pool.query(
            `INSERT INTO visitors(
            visitor_name,
            visitor_age,
            date_of_visit,
            time_of_visit,
            assistant,
            comments)
        VALUES($1,$2,$3,$4,$5,$6)
        RETURNING *`,
        [visitor_name, visitor_age, date_of_visit, time_of_visit, assistant, comments],
        (error, results) => {
            if (error) {
                reject(error);
            }
            console.info("Visitor has been added!");
            resolve(results.rows);
        })
    });
}

const listVisitors = async() => {
    return new Promise(async(resolve,reject) => {
        await pool.query('SELECT id, visitor_name FROM visitors', (error, results) => {
            if (error){
                reject(error)
            }
            console.info(results.rows);
            resolve(results.rows);
            })
    })
}

const deleteVisitor = async (id) => {
    return new Promise(async(resolve,reject) => {
        await pool.query('DELETE FROM visitors WHERE id = $1', [id], (error, results) => {
            if (error) {
                reject(error);
            }
            console.log('user successfully deleted!');
            resolve(results.rows);
        })
    })
}

const updateVisitor = async(id, visitor_name, visitor_age, date_of_visit, time_of_visit, assistant, comments) => {
    return new Promise(async(resolve, reject) => {
        await pool.query(
            `UPDATE visitors SET 
            visitor_name = $2, 
            visitor_age = $3, 
            date_of_visit = $4, 
            time_of_visit = $5, 
            assistant = $6, 
            comments = $7 
            WHERE id = $1`,
        [id, visitor_name, visitor_age, date_of_visit, time_of_visit, assistant, comments],
        (error, results) => {
            if (error) {
                reject(error);
            }
            console.log("Visitor has been updated!");
            resolve(results);
        })
    });
}

const viewVisitor = async (id) => {
    return new Promise(async(resolve,reject) => {
        await pool.query('SELECT * FROM visitors WHERE id = $1', [id], (error, results) => {
            if (error){
                reject(error)
            }
            console.info(results.rows)
            resolve(results.rows);
        })
    })
}

const deleteAllVisitors = async () => {
    return new Promise(async(resolve,reject) => {
        await pool.query('DELETE FROM visitors', (error, results) => {
            if (error) {
                reject(error);
            }
            console.log('Deleted!');
            resolve(results.rows);
        })
    })
}

module.exports = {
    //createTable,
    addNewVisitor,
    listVisitors,
    deleteVisitor,
    updateVisitor,
    viewVisitor,
    deleteAllVisitors
}
