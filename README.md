# Siji Financiers - Gold Loan Management Sytem

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


---

> This README will be updated as the project progresses.

