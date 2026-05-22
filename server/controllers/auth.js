const { hashPassword, comparePassword } = require('../utils/passwordUtils')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config')
const validator = require('validator')
const { getUserById, getUserByUsername, getUserByEmail, createUser } = require('../db/userQueries')

const register = async (req, res) => {
    const { username, name, email, password } = req.body

    try {

        if (!username || !name || !email || !password) {
            return res.status(400).json({
                error: 'Please fill up input fields'
            })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                error: 'Invalid email format'
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                error: 'Password must be at least 6 characters.'
            });
        }

        const userByEmail = await getUserByEmail(email);
        const userByUsername = await getUserByUsername(username)

        if (userByEmail.length > 0 || userByUsername.length > 0) {
            return res.status(400).json({
                error: 'Email or username exists'
            });
        }

        const hashedPassword = await hashPassword(password)
        const newUser = await createUser(username, name, email, hashedPassword, 'user')

        const payload = {
            user_id: newUser[0].user_id,
            role: newUser[0].role
        }

        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' })
        const userWithoutPassword = {
            user_id: newUser[0].user_id,
            username: newUser[0].username,
            name: newUser[0].name,
            email: newUser[0].email,
            role: newUser[0].role
        };

        res.json({ token, user: userWithoutPassword });
    }
    catch (error) {
        console.error('❌ REGISTRATION ERROR:', error.message);
        res.status(500).json({ error: 'Server error' })
    }
}

const login = async (req, res) => {

    try {
        const { username, password } = req.body

        if (!username) {
            return res.status(400).json({
                error: 'Username field is empty'
            })
        }

        if (!password) {
            return res.status(400).json({
                error: 'Password field is empty'
            })
        }

        const user = await getUserByUsername(username);

        if (user.length === 0) {
            return res.status(401).json({
                error: 'Username or password is invalid'
            })
        }

        const isValid = await comparePassword(password, user[0].password)


        if (!isValid) {
            return res.status(401).json({ error: 'Username or password is invalid' });
        }

        const payload = {
            user_id: user[0].user_id,
            role: user[0].role
        };

        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

        const userWithoutPassword = {
            user_id: user[0].user_id,
            username: user[0].username,
            name: user[0].name,
            email: user[0].email,
            role: user[0].role
        };
        res.json({ token, user: userWithoutPassword });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' })
    }
}

module.exports = {
    register,
    login
};