const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, updateUserById, deleteUserById } = require("../db/userQueries")
const { checkAuth, requireAdmin } = require("../middleware/auth-middleware")


// Get all User
router.get('/', checkAuth, requireAdmin, async (req, res) => {
    try {
        const users = await getAllUsers()
        const sanitized = users.map(({ password, ...user }) => user)
        res.json(sanitized)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
});

// Get User by id
router.get('/:id', checkAuth, requireAdmin, async (req, res) => {
    const id = req.params.id
    try {
        const user = await getUserById(id)
        if (user.length === 0) {
            return res.status(404).json({ error: 'User not found' })
        }
        const { password, ...sanitized } = user[0]
        res.json(sanitized)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
});

// Update a User by id
router.put('/:id', checkAuth, requireAdmin, async (req, res) => {
    const id = req.params.id
    const { name, email } = req.body
    try {
        if (!name || !email || !id) {
            return res.status(400).json({ error: 'Data not valid' })
        }
        const user = await updateUserById(name, email, id)
        const { password, ...sanitized } = user[0]
        res.json(sanitized)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
});

// Delete User by id
router.delete('/:id', checkAuth, requireAdmin, async (req, res) => {
    const id = req.params.id
    try {
        const user = await deleteUserById(id)
        if (user.length === 0) {
            return res.status(404).json({ error: 'User not found' })
        }
        const { password, ...sanitized } = user[0]
        res.json(sanitized)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
});


module.exports = router;