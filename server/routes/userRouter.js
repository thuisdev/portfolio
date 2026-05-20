const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, getUserById, updateUserById, deleteUserById } = require("../db/userQueries")
const { checkAuth} = require ("../middleware/auth-middleware")


// Get all User
router.get('/', checkAuth, async (req, res) => {
    try{
        const users = await getAllUsers()
        const sanitized = users.map(({ password, ...user }) => user)
        res.json(sanitized)
     } catch(error) {
        console.error(error)
        res.status(500).json({error: 'Internal server error'})
     }
});

// Get User by id
router.get('/:id', checkAuth, async (req,res) => {
    const id = req.params.id
    try {
        const user = await getUserById(id)
        if (user.length === 0) {
            return res.status(404).json({error: 'User not found'})
        }
        res.json(user)
    } catch(error) {
        console.error(error)
        res.status(500).json({error: 'Internal server error'})}
}); 

// Create a new User
router.post('/', async (req, res) => {
    const {username, name, email, role} = req.body
    try{ 
        if (!name || !email || !username) {
            return res.status(400).json({error: 'Data not valid'})
        }
        const user = await createUser(username, name, email, role)
        res.json(user)
    } catch(error) {
        console.error(error)
        res.status(500).json({error: 'Internal server error'})
    }
});

// Update a User by id
router.put('/:id', checkAuth, async (req, res) => {
    const id = req.params.id
    const {name, email} = req.body
    try{ 
        if (!name || !email || !id) {
            return res.status(400).json({error: 'Data not valid'})
        }
        const user = await updateUserById(name, email, id)
        res.json(user)
    } catch(error) {
        console.error(error)
        res.status(500).json({error: 'Internal server error'})}
});

// Delete User by id
router.delete('/:id', checkAuth, async (req, res) => {
    const id = req.params.id
    try{
        const user = await deleteUserById(id)
        if (user.length === 0){
            return res.status(404).json({error: 'User not found'})
        }
        res.json(user)
    } catch(error) {
        console.error(error)
        res.status(500).json({error: 'Internal server error'})}
});


module.exports = router;