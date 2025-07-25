import express from 'express'
import { getAllCustomers, findCustomerById, saveCustomer, updateCustomer, deleteCustomer } from '../models/customerModel.js'

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
    findCustomerById(parseInt(id))
    .then(result => res.status(200).json(result))
    .catch(err => res.status(400).json({error: err.message}));
});

router.patch('/:id', async(req, res) => {
    const id = req.params.id;
    const customerData = req.body;
    updateCustomer(id, customerData)
    .then(result => {
        if (result > 0) {
            res.status(200).json({message: 'Updated successfully'});
        } else {
            res.status(404).json({message: 'Customer not found'});
        }
    })
    .catch(err => console.log(err.message));
});

router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    deleteCustomer(id)
    .then(result => {
        if(result > 0) {
            res.status(200).json({message: "Customer deleted successfully"});
        } else {
            res.status(404).json({message: "customer not found"})
        }
    })
    .catch(err => {
        res.status(500).json({error: "internal server error : " + err.message});
    });
});

export default router