const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Доступ по адресу: /api/users/profile
router.route('/profile')
    .get(protect, getUserProfile)    // Получить профиль
    .put(protect, updateUserProfile); // Обновить профиль

module.exports = router;