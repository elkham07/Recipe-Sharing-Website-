const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Маршрут: /api/auth/register
router.post('/register', registerUser);

// Маршрут: /api/auth/login
router.post('/login', loginUser);

module.exports = router;