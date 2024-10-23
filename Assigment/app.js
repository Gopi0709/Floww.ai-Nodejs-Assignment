const express = require('express');
const bodyParser = require('body-parser');
const transactionRoutes = require('./routes/transactions');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/categories', categoryRoutes);
app.use('/api', authRoutes);
app.use('/api', transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
