CREATE TABLE IF NOT EXISTS customers (
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    customer_address TEXT,
    id_proof TEXT
);

INSERT INTO customers (customer_name, phone, email, customer_address, id_proof)
VALUES ('Nithin K Thomas', '9207247410', 'nithinkthomas51@gmail.com', 'Kainon House, Chittar', '618842345564');

INSERT INTO customers (customer_name, phone, email, customer_address, id_proof)
VALUES ('Naveen K Thomas', '7765432131', 'nnaveenkthomas@gmail.com', 'Kainon House, Chittar', '618842376564');

INSERT INTO customers (customer_name, phone, email, customer_address, id_proof)
VALUES ('ABC', '9207247410', 'abc@gmail.com', 'ABC House, Chittar', '618842345564');