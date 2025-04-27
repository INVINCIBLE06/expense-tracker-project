// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "user name required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "user email required"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "user password required"],
        minlength: 7
    }
},
{
    timestamps: true
}
);

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;