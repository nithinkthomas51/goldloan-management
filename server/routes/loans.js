import express from 'express'
import { saveLoan } from '../models/loanModel.js';
const router = express.Router();

const loans = [
    {
        loanId: 'loan01',
        customerId: 1,
        amount: 15000,
        startDate: '15-10-2024',
        dueDate: '14-4-2025',
        status: 'active',
        interestRate: 10        
    },
    {
        loanId: 'loan02',
        customerId: 2,
        amount: 25000,
        startDate: '10-4-2024',
        dueDate: '9-4-2025',
        status: 'active',
        interestRate: 10        
    },
    {
        loanId: 'loan03',
        customerId: 1,
        amount: 10000,
        startDate: '8-02-2024',
        dueDate: '7-8-2024',
        status: 'closed',
        interestRate: 10        
    }
];

router.post('/', (req, res) => {
    if (!req.body) {
        res.status(400).json({error: 'Loan Details not available'});
        return;
    }

    const loanDetails = {
        customer_id: req.body.customer_id,
        start_date: req.body.start_date,
        due_date: req.body.due_date,
        total_weight: req.body.total_weight,
        estimated_value: req.body.estimated_value,
        loan_amount: req.body.loan_amount,
        interest_rate: req.body.interest_rate,
        emi: req.body.emi,
        status: 'active',
    };

    saveLoan(loanDetails)
    .then(result => {
        res.status(200).json({loan_id: result.lastID, row_changed: result.changes})
    })
    .catch(err => res.status(500).json({error: err.message}));
});

router.get('/', (req, res) => {
    res.send(loans);
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    const loan = loans.find((loan) => loan.loanId === id);
    res.send(loan);
})

router.get('/filter/:id', (req, res) => {
    const { id } = req.params;
    const filteredLoans = [];
    loans.forEach((loan) => {
        if (loan.customerId === parseInt(id)) {
            filteredLoans.push(loan);
        };
    });

    res.send(filteredLoans);
});

export default router