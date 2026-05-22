const express = require('express');
const { register, login, getMe } = require('../controllers/auth');
const { checkAuth } = require('../middleware/auth-middleware');

const router = express.Router();

router.post('/create-account', register);
router.post('/login', login);
router.get('/me', checkAuth, getMe)

module.exports = router;