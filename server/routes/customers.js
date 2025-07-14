import express from 'express'
import { getAllCustomers, findCustomerById, saveCustomer } from '../models/customerModel.js'

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const customers = await getAllCustomers();
        res.status(200).json({data: customers});
    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
});

router.post('/register', async(req, res) => {
    if (!req.body) {
        res.status(400).json({error: 'Customer Details not available'});
        return;
    }

    const customerDetails = {
        customer_name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        customer_address: req.body.address,
        id_proof: req.body.customerID
    };

    saveCustomer(customerDetails)
    .then(result => res.status(200).json({customer_id: result.lastID, row_changed: result.changes}))
    .catch(err => res.status(500).json({error: err.message}));
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const customer = await findCustomerById(parseInt(id));
        res.status(200).json(customer);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

export default router