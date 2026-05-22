const { pool } = require('./dbconn');

// Get Users
const getAllUsers = async () => {
    const queryTx = `SELECT * FROM Users`

    const users = await pool.query(queryTx)
    return users.rows
};

// Get User by ID
const getUserById = async (id) => {
    const queryTx = `SELECT * FROM Users WHERE user_id = $1`

    const user = await pool.query(queryTx, [id])
    return user.rows
};

// Get user by Username
const getUserByUsername = async (username) => {
    const queryTx = `SELECT * FROM Users WHERE username = $1`;
    const user = await pool.query(queryTx, [username]);
    return user.rows;
};

// Get user by email
const getUserByEmail = async (email) => {
    const queryTx = `
    SELECT *
    FROM Users
    WHERE email = $1`;
    const user = await pool.query(queryTx, [email]);
    return user.rows;
};

// Create User
const createUser = async (username, name, email, hashedPassword, role) => {
    const queryTx = `
    INSERT INTO Users (username, name, email, password, role) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING user_id, username, name, email, role, created_at`

    const user = await pool.query(queryTx, [username, name, email, hashedPassword, role])
    return user.rows
};

// Update User By id
const updateUserById = async (name, email, id) => {
    const queryTx = `
    UPDATE Users SET name = $1, email = $2 
    WHERE user_id = $3 
    RETURNING *`

    const user = await pool.query(queryTx, [name, email, id])
    return user.rows
};

// Delete User By id
const deleteUserById = async (id) => {
    const queryTx = `DELETE FROM Users 
    WHERE user_id = $1 
    RETURNING *`

    const user = await pool.query(queryTx, [id])
    return user.rows
};

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    getUserByUsername,
    getUserByEmail,
    updateUserById,
    deleteUserById
};