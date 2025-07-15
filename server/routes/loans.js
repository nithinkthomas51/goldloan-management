import express from 'express'
import { saveLoan, findLoanById, getAllLoans } from '../models/loanModel.js';
const router = express.Router();


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

router.get('/', async (req, res) => {
    try {
        const loans = await getAllLoans();
        res.status(200).json({data: loans});
    } catch(err) {
        res.status(400).json({error: "Falied to get loans : " + err.message});
    }
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    findLoanById(id)
    .then(result => res.status(200).json(result))
    .catch(err => {
        console.log(err.message);
        res.status(500).json({error: err.message});
    });
})

// router.get('/filter/:id', (req, res) => {
//     const { id } = req.params;
//     const filteredLoans = [];
//     loans.forEach((loan) => {
//         if (loan.customerId === parseInt(id)) {
//             filteredLoans.push(loan);
//         };
//     });

//     res.send(filteredLoans);
// });

export default router