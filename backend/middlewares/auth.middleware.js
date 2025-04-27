// middleware/auth.js

const jwt = require('jsonwebtoken');

exports.generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRE_TIME });
};

exports.decodeToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

// Middleware to protect routes
exports.auth = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");


        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded._id; 
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};
