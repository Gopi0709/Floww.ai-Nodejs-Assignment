const Category = require('../models/categoryModel');

exports.createCategory = async (req, res) => {
    const { name, type } = req.body;

    try {
        const category = await Category.create({ name, type });
        res.status(201).json({ success: true, category });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json({ success: true, categories });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
