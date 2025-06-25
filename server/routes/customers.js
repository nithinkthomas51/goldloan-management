import express from 'express'
import { getAllCustomers, findCustomerById } from '../models/customerModel.js'

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const customers = await getAllCustomers();
        res.status(200).json(customers);
    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
});

router.post('/register', async(req, res) => {
    if (!req.body) {
        res.status(500).json({error: 'Customer Details not available'});
        return;
    }

    const customerDetails = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        idProof: req.body.customerID
    };

    console.log(customerDetails.name + ", " + customerDetails.phone);
    res.status(200).json({message: 'Registration Successful'});
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