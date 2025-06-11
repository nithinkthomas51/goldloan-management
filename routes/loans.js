import express from 'express'
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