import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

import customerRoutes from './routes/customers.js'
import loanRoutes from './routes/loans.js'

const PORT = 5000;

app.use('/customers', customerRoutes);
app.use('/loans', loanRoutes);

app.get('/', (req, res) => {
    res.send('Test App');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));