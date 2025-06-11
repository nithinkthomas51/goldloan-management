import express from 'express'

const router = express.Router();
const customers = [
    {
        customerId: 1,
        customerName: 'Nithin K Thomas',
        contact: '+353904641188',
        email: 'nithinkthomas51@gmail.com'
    },
    {
        customerId: 2,
        customerName: 'Naveen K Thomas',
        contact: '+919207247410',
        email: 'naveenkthomas51@gmail.com'
    },
    {
        customerId: 3,
        customerName: 'ABC',
        contact: '+353904642288',
        email: 'abc@gmail.com'
    }
];

router.get('/', (req, res) => {
    res.send(customers);
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    const customer = customers.find((customer) => customer.customerId === parseInt(id));
    res.send(customer);
})

export default router