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

export { saveLoan }