# Siji Financiers - Gold Loan Management Sytem

**Student Name:** Nithin Kainon Thomas  
**Student ID:** 20070506  
**Course ID:** B9IS123  
**Course Name:** Programming for Information Systems  

## Introduction

This project aims to develop an information system for **Siji Financiers**, a local financial organization located in Kerala, India. The company provides short-term financial loans for customers against gold as collateral.

The purpose of this project is to digitalize the important business operations of the company such as customer registration, loan issuance, automatic interest calculations, and repayment tracking, enabling more efficient and error-free management of records.

## Objectives

-   Build a simple, functional CRUD based information system tailored to a real-world finace company.
-   Enable digital management of customer, loan, and pledged gold records.
-   Calculate and track interests, due dates, and repayment status.
-   Provide a dashboard for customers to view all their loans and its current status.

## Planned Features/Requirements

-   Customer registration and profile management (CRUD)
-   Creation of loans with the respective gold details
-   Automatic interest calculation
-   Repayment tracking and loan closure
-   Search functionality by customer name or ID
-   Customer login
-   A customer portal displaying their loan history, loan status, and due dates.
-   Role-based access controls (Admin vs Staff vs Customer)

## Data Entities

### Customer
-   `customer_id`: INTEGER PRIMARY KEY
-   `name`: TEXT
-   `phone`: TEXT
-   `email`: TEXT
-   `address`: TEXT
-   `id_proof`: TEXT
### Loan
-   `loan_id`: INTEGER PRIMARY KEY
-   `customer_id`: INTEGRE FOREIGN KEY
-   `start_date`: TEXT
-   `due_date`: TEXT
-   `total_weight`: REAL
-   `estimated_value`: REAL
-   `loan_amount`: REAL
-   `interest_rate`: REAL
-   `emi`: REAL
-   `status`: TEXT
### Pledged Gold
`Not Implemented`
### Payments
`Not Implemented`
### User
`Not Implemented`

## Planned Technologies

-   **Frontend**: HTML CSS Javascript
-   **Backend**: Express
-   **Database**: SQLite
-   **Version Control**: Git GitHub

## Implemented Features

### Staff Dashboard

- Add/Edit/Delete Customers
- Create new Loan with multiple gold items
- Auto calculate total weight and estimated gold value
- View all customers and loans

### Business Logic

- Estimated Value = weight * (purity/24) * market rate (6999/gram default)

## API Overview

### Customers

- `GET /customers` -> Fetch all customers
- `POST /customers/register` -> Add a new customer
- `PATCH /customers/:id` -> Update customer
- `DELETE /customers/:id` -> Delete customer

### Loans

- `GET /loans` -> Fetch all loans
- `POST /loans` -> Add new loan

## Challenges Faced

1. Node - Sqlite3 connection
    - Referred a [Youtube video by Steve Griffith - Prof3ssorSt3v3](https://www.youtube.com/watch?v=_RtpUaBSie0) to understand how to create a Node js - Sqlite application
    - Inspired by this video, added own code to create an sqlite database and tables and executed SQL queries
    - Commits: [Installed sqlite dependency from node package manager](https://github.com/nithinkthomas51/goldloan-management/commit/c591e22a0a406082f547b278f6380131996dfde8), [Created a customer table, added APIs for retrieving all customers and customer by their IDs.](https://github.com/nithinkthomas51/goldloan-management/commit/7cea68df2377726b29ebc0cb2be3d65056210835)
2. Establishing a successful connection between front-end and back-end
    - Referred [GeeksforGeeks Tutorial](https://www.geeksforgeeks.org/blogs/how-to-connect-front-end-and-backend/) and blogs by [Sanoop, A.M](https://medium.com/@aswathymsanoop/practical-illustration-frontend-backend-connection-via-restful-api-communication-9f6930bc8e57) and [Berger, J.](https://joshberger6969.medium.com/fetching-from-front-end-to-back-end-using-api-4b0546a8b779.) on how to establish a successful front-end - back-end connection to create the first fetch request
    - commit: [Customer Registration](https://github.com/nithinkthomas51/goldloan-management/commit/7cea68df2377726b29ebc0cb2be3d65056210835)
3. Method DELETE not allowing on Fetch request
    - Faced issue when sending fetch request with method as DELETE. CORS policy was blocking the request.
    - Observed that the pre-flight OPTIONS request was failing since it was not enabled explicitly. Referred [Express.js' CORS Middleware](https://expressjs.com/en/resources/middleware/cors.html) documentation to enable the OPTIONS.
    - This introduced a new RegEx error, which was then resolved with the help of chatGPT (commit: [Customer Delete Service](https://github.com/nithinkthomas51/goldloan-management/commit/a5737ba15f4f26ccb52d040b5192ba228be13ea7) -> server/index.js file)
    - The remaining contents in this commit is my own work.

## Code written with the help of GenAI

1. HTML and CSS for Landing page and its Hero section
    - Prompt: 
    ```
    Give me the HTML and CSS code for a navbar having Siji Financiers at the left top and two buttons Customer Login and Staff Login at the top right.
    ```

    ```
    Give me the hero section too for the landing page
    ```
    - Commit: [Landing Page](https://github.com/nithinkthomas51/goldloan-management/commit/a2702de477841345a4bec4d97071d86d8da7b0de) -> client/index.html and client/index.css files

2. HTML and CSS for Staff Dashboard
    - Prompt:
    ```
    Give me a staff login page with below requirements. I don't want any backend implementation. Just need the frontend.
	Upon logging in as Staff, the staff page should have an Add Customer button and a Create New Loan button on the navbar
		a. Add Customer form 
			i. Customer Name
			ii. Phone
			iii. Email
			iv. Address
			v. ID Proof (ID number)
		b. Create New Loan form 
			i. Customer ID
			ii. Start Date
			iii. Gold Details [A mini form where we can add as much as we want]
				1) Item [drop-down of common gold items]
				2) Weight [grams]
				3) Purity [karat]
				4) Add new Item [button]
			iv. Total weight [Auto calculated from above]
			v. Estimated Value [Auto calculated]
			vi. Loan Amount [Can't go beyond 90% of estimated value]
			vii. Interest
			viii. Due Date
			ix. EMI [Auto calculated]
    ```
    - Commit: [Staff Dashboard](https://github.com/nithinkthomas51/goldloan-management/commit/073e3b5e160c74d481e365bb7a2300c18ec1667d) -> client/staff.html, client/staff.css, and client/index.html files

2. Regular Expression for enabling pre-flight OPTIONS across-the-board
    - Prompt: 
    ```
    When I add app.options(), I am getting this error while running the index.js
    /workspaces/goldloan-management/server/db/goldloan_management.db
    /workspaces/goldloan-management/server/node_modules/path-to-regexp/dist/index.js:73
    throw new TypeError('Missing parameter name at ${i}: ${DEBUG_URL}');
        ^
    ```
    - Commit: [customer delete service](https://github.com/nithinkthomas51/goldloan-management/commit/a5737ba15f4f26ccb52d040b5192ba228be13ea7) -> server/index.js file

## Refereneces

- GeeksforGeeks, (2023). *How to connect front-end and back-end?* [online] GeeksforGeeks. Available at: https://www.geeksforgeeks.org/blogs/how-to-connect-front-end-and-backend/.
- Berger, J., (2022). *Fetching from front end to back end using API.* [online] Medium. Available at: https://joshberger6969.medium.com/fetching-from-front-end-to-back-end-using-api-4b0546a8b779.
- Sanoop, A.M., (2023). *Practical illustration: Frontend-Backend connection via RESTful API communication.* [online] Medium. Available at: https://medium.com/@aswathymsanoop/practical-illustration-frontend-backend-connection-via-restful-api-communication-9f6930bc8e57.
- Steve Griffith - Prof3ssorSt3v3, (2024). *Up and Running with SQLite3 in a NodeJS API.* [video online] YouTube, published January 2024. Available at: https://www.youtube.com/watch?v=_RtpUaBSie0
- Express.js. (n.d.). *CORS middleware*. [online] Available at: https://expressjs.com/en/resources/middleware/cors.html.
- freeCodeCamp. (2022). *How to Create a CRUD API Project*. [online] Available at: https://www.freecodecamp.org/news/create-crud-api-project/#heading-how-to-create-the-get-users-endpoint.
- Stack Overflow. (2022). *Method DELETE not allowed on Fetch request - CORS*. [online] Available at: https://stackoverflow.com/questions/71635069/method-delete-not-allowed-on-fetch-request-cors/71635157.
- OpenAI, (2025). *ChatGPT*. [online] Available at: https://chat.openai.com.

---

