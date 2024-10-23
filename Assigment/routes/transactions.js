const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/transactions', authMiddleware, transactionController.addTransaction);
router.get('/transactions', authMiddleware, transactionController.getAllTransactions);
router.get('/transactions/:id', authMiddleware, transactionController.getTransactionById);
router.put('/transactions/:id', authMiddleware, transactionController.updateTransaction);
router.delete('/transactions/:id', authMiddleware, transactionController.deleteTransaction);
router.get('/summary', authMiddleware, transactionController.getSummary);

module.exports = router;
