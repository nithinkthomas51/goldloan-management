import db from './db.js';

async function getAllCustomers() {
    const sqlStmt = 'SELECT * FROM customers;';
    let data = {customers: []};
    return new Promise((resolve, reject) => {
        db.all(sqlStmt, [], (err, rows) => {
        if (err) {
            console.log('Error while fetching customers: ' + err.message);
            reject(err);
        } else {
            rows.forEach((row) => {
                let customer = {
                    id: row.customer_id,
                    name: row.customer_name,
                    phone: row.phone,
                    email: row.email,
                    address: row.customer_address,
                    id_proof: row.id_proof
                };
                data.customers.push(customer);
            });
            resolve(data);
        }
        });
    });
}

async function findCustomerById(id) {
    const sqlStmt = 'SELECT * FROM customers WHERE customer_id = ?;';
    return new Promise((resolve, reject) => {
        db.get(sqlStmt, [id], (err, row) => {
            if (err) {
                console.log('Error while fetching customer with id: ' + id);
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

export { getAllCustomers, findCustomerById }