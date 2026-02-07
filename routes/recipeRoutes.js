const express = require('express');
const router = express.Router();
const { 
    createRecipe, 
    getRecipes, 
    getRecipeById, 
    updateRecipe, 
    deleteRecipe 
} = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware');

const { getRandomRecipe, } = require('../controllers/recipeController');

// Добавь это ПЕРЕД router.route('/:id')
router.get('/random', getRandomRecipe);

// Все маршруты здесь будут защищены токеном
router.route('/')
    .post(protect, createRecipe) // Создать
    .get(protect, getRecipes);   // Получить все свои

router.route('/:id')
    .get(protect, getRecipeById) // Получить один
    .put(protect, updateRecipe)  // Обновить
    .delete(protect, deleteRecipe); // Удалить

module.exports = router;