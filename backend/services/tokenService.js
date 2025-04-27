
const jwt = require('jsonwebtoken');

// Function to generate token
const generateToken = (userId) => {
    const token = jwt.sign(
        { _id: userId.toString() },
        process.env.JWT_SECRET,
        { expiresIn: process.env.EXPIRE_TIME }
    );
    return token;
};

// Function to decode/verify token
const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded; // returns { _id: userId, iat, exp }
    } catch (error) {
        throw new Error('Invalid token');
    }
};

module.exports = {
    generateToken,
    verifyToken
};
