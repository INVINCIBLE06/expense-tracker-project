const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, "expense amount required"],
    },
    category: {
        type: String,
        required: [true, "expense category required"],
    },
    description: {
        type: String,
        required: [true, "expense description required"],
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "expense user Id required"],
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Expense', ExpenseSchema);