const Expense = require("../models/expense.model");


// Get all expenses
exports.getAllExpenses = async (req, res) =>
{
    try {
        const expenses = await Expense.find({ userId: req.userId, isActive: true });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }

};

// The below function is for adding new expense
exports.addNewExpense = async (req, res) =>
{
    const expense = new Expense({
        amount: req.body.amount,
        category: req.body.category,
        description: req.body.description,
        date: req.body.date,
        userId: req.userId
    });

    try {
        const newExpense = await expense.save();
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// The below function is for updating any patricular expense
exports.updateExpense = async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true } );
        res.json(updatedExpense);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// The below function is for deleting any particular expense 
exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndUpdate(req.params.id, { isActive: false });
        res.json({ message: "Expense deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};