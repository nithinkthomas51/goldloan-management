import sqlite3 from 'sqlite3';
import path from 'path';
const sql3 = sqlite3.verbose();

const dirName = path.resolve();
const dbFilePath = path.join(dirName, '/db/goldloan_management.db');
console.log(dbFilePath);

const DB = new sql3.Database(dbFilePath, sqlite3.OPEN_READWRITE, connected);

function connected(err) {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log('Created the DB or sqlite DB already exists.');
}

export default DB