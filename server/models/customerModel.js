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
                let customer = {
                    id: row.customer_id,
                    name: row.customer_name,
                    phone: row.phone,
                    email: row.email,
                    address: row.customer_address,
                    id_proof: row.id_proof
                }
                resolve(customer);
            }
        });
    });
}

// Save the given customer to customers table
async function saveCustomer(customer) {
    const sqlStmt = "INSERT INTO customers (customer_name, phone, email, customer_address, id_proof) VALUES (?, ?, ?, ?, ?)";
    const { customer_name, phone, email, customer_address, id_proof } = customer;

    return new Promise((resolve, reject) => {
        db.run(sqlStmt, [customer_name, phone, email, customer_address, id_proof], function (err) {
            if (err) {
                reject(err.message);
            } else {
                resolve({lastID: this.lastID, changes: this.changes});
            }
        });
    });
}

export { getAllCustomers, findCustomerById, saveCustomer }