const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const { generateToken } = require('../services/tokenService');

// Login
exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ error: "User not found" });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ error: "Invalid login credentials" });
        }

        const token = generateToken(user._id);

        res.send({ user, token });
    } catch (err) {
        res.status(500).send({ error: "Something went wrong" });
    }
};

// Register
exports.userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: 'Email already in use' });
        }

        const user = new User({
            name,
            email,
            password,
        });

        await user.save();

        const token = generateToken(user._id);

        res.status(201).send({ user, token });
    } catch (err) {
        res.status(400).send({ error: err.message || 'Registration failed' });
    }
};

