import express from 'express'
import bodyParser from 'body-parser'
import customerRoutes from './routes/customers.js'
import loanRoutes from './routes/loans.js'

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use('/customers', customerRoutes);
app.use('/loans', loanRoutes);

app.get('/', (req, res) => {
    res.send('Test App');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));