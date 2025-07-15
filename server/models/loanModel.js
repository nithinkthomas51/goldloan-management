import db from './db.js'

async function saveLoan(loan) {
    const sqlStmt = "INSERT INTO loans (customer_id, start_date, due_date, total_weight, estimated_value, loan_amount, interest_rate, emi, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const { customer_id, start_date, due_date, total_weight, estimated_value, loan_amount, interest_rate, emi, status } = loan;

    return new Promise((resolve, reject) => {
        db.run(sqlStmt, [customer_id, start_date, due_date, total_weight, estimated_value, loan_amount, interest_rate, emi, status], function(err) {
            if(err) {
                reject(err.message)
            } else {
                resolve({lastID: this.lastID, changes: this.changes});
            }
        });
    });
}

async function getAllLoans() {
    const sqlStmt = 'SELECT * FROM loans';
    let data = {loans: []};

    return new Promise((resolve, reject) => {
        db.all(sqlStmt, [], (err, rows) => {
            if (err) {
                console.log("Failed to fetch all loans: " + err.message);
                reject(err);
            } else {
                rows.forEach(row => {
                    let loan = {
                        loan_id: row.loan_id,
                        customer_id: row.customer_id,
                        loan_amount: row.loan_amount,
                        interest_rate: row.interest_rate,
                        emi: row.emi,
                        start_date: row.start_date,
                        due_date: row.due_date,
                        status: row.status
                    };
                    data.loans.push(loan);
                });
                resolve(data);
            }
        });
    });
}

async function findLoanById(id) {
    const sqlStmt = 'SELECT * FROM loans WHERE loan_id = ?;';
    return new Promise((resolve, reject) => {
        db.get(sqlStmt, [id], (err, row) => {
            if (err) {
                console.log('Error while fetching loan with ID: ' + id);
                reject(err);
            } else {
                let loan = {
                    loan_id: row.loan_id,
                    customer_id: row.customer_id,
                    loan_amount: row.loan_amount,
                    interest_rate: row.interest_rate,
                    emi: row.emi,
                    start_date: row.start_date,
                    due_date: row.due_date,
                    status: row.status
                }
                resolve(loan);
            }
        });
    });
}

export { saveLoan, findLoanById, getAllLoans }