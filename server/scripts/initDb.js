import fs from 'fs'
import path from 'path'
import db from '../models/db.js'

const dirName = path.resolve();

// IIFE - Immediately Invoked Function Expression
function initDbSql() {
    const initSql = fs.readFileSync(path.join(dirName, 'db/init.sql'), 'utf-8');
    db.exec(initSql, (err)=> {
        if (err) {
            console.log('Error while initialising DB:' + err.message);
            return;
        }
        console.log('Initialized DB');
        
    });
}

initDbSql();