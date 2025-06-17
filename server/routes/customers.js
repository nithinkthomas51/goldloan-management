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