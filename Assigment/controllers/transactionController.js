const Transaction = require('../models/transactionModel');  // Make sure the transaction model exists

exports.addTransaction = async (req, res) => {
  try {
    const { type, category, amount, date, description } = req.body;
    console.log(type, category, amount, date, description, req.user.id)
    const newTransaction = await Transaction.create({
      type,
      category,
      amount,
      date,
      description,
      userId: req.user.userId  // Make sure userId is set via auth middleware
    });
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add transaction' });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAllByUser(req.user.userId);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve transactions' });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve transaction' });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const { type, category, amount, date, description } = req.body;
    console.log({ type, category, amount, date, description })
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    await Transaction.update(req.params.id, { type, category, amount, date, description });

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update transaction' });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });

    await Transaction.delete(req.params.id);
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.findAllByUser(req.user.userId);
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpenses;

    res.status(200).json({ totalIncome, totalExpenses, balance });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve summary' });
  }
};
