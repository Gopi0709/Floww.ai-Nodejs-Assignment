const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const JWT_SECRET='kjhghjkiujhgfghjkiuh'
exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword, email});
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to register user' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await User.findByEmail(email);
    console.log(user)
    if (!user) return res.status(400).json({ error: 'User not found' });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
};
