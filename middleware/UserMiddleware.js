const jwt = require('jsonwebtoken')
const { User } = require('../models')
require('dotenv').config()

exports.authMiddleware = async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        return next(res.status(401).json({
            status: 'Not Authorize',
            message: 'User not authorize'
        }))
    }

    let decoded;
    try {
        decoded = await jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return next(res.status(401).json({
            error: error,
            message: 'Token invalid'
        }))
    }

    const currentUser = await User.findByPk(decoded.id)

    req.user = currentUser;

    next()
} 