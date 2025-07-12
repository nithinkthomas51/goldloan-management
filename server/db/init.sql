CREATE TABLE IF NOT EXISTS customers (
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    customer_address TEXT,
    id_proof TEXT
);

CREATE TABLE IF NOT EXISTS loans (
    loan_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    start_date TEXT NOT NULL,
    due_date TEXT NOT NULL,
    total_weight REAL NOT NULL,
    estimated_value REAL NOT NULL,
    loan_amount REAL NOT NULL,
    interest_rate REAL NOT NULL,
    emi REAL NOT NULL,
    status TEXT DEFAULT 'active',
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE IF NOT EXISTS pledged_gold (
    item_id INTEGER PRIMARY KEY AUTOINCREMENT,
    loan_id INTEGER NOT NULL,
    item_type TEXT NOT NULL,
    weight REAL NOT NULL,
    purity INTEGER NOT NULL,
    FOREIGN KEY (loan_id) REFERENCES loans(loan_id)
);

INSERT INTO customers (customer_name, phone, email, customer_address, id_proof)
VALUES ('Nithin K Thomas', '9207247410', 'nithinkthomas51@gmail.com', 'Kainon House, Chittar', '618842345564');

INSERT INTO customers (customer_name, phone, email, customer_address, id_proof)
VALUES ('Naveen K Thomas', '7765432131', 'nnaveenkthomas@gmail.com', 'Kainon House, Chittar', '618842376564');

INSERT INTO customers (customer_name, phone, email, customer_address, id_proof)
VALUES ('ABC', '9207247410', 'abc@gmail.com', 'ABC House, Chittar', '618842345564');