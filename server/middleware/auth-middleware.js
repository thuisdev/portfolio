const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config')

const checkAuth = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send('Access denied')
    }

    if (!token.startsWith('Bearer ')) {
        return res.status(401).send('Invalid token format');
    }

    const tokenBody = token.slice(7);
    jwt.verify(tokenBody, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).send('Error: Access denied')
        }
        req.user = decoded;
        next();
    })
}

module.exports = {
    checkAuth,
}