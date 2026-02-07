const Recipe = require('../models/Recipe');

// @desc    Создать новый рецепт
// @route   POST /api/resource (в твоем случае /api/recipes)
// @access  Private
exports.createRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, cookingTime, difficulty } = req.body;

        const recipe = await Recipe.create({
            title,
            ingredients,
            instructions,
            cookingTime,
            difficulty,
            author: req.user._id // ID берем из токена (после проверки middleware)
        });

        res.status(201).json(recipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Получить все рецепты (или только свои)
// @route   GET /api/resource
// @access  Private/Public (зависит от логики, сделаем Private по списку)
exports.getRecipes = async (req, res) => {
    try {
        // Находим рецепты, где автором является текущий пользователь
        const recipes = await Recipe.find({ author: req.user._id });
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Получить конкретный рецепт по ID
// @route   GET /api/resource/:id
// @access  Private
exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.json(recipe);
    } catch (error) {
        res.status(400).json({ message: 'Invalid ID format' });
    }
};

// @desc    Обновить рецепт
// @route   PUT /api/resource/:id
// @access  Private
exports.updateRecipe = async (req, res) => {
    try {
        let recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        // Проверка: принадлежит ли рецепт тому, кто пытается его обновить
        if (recipe.author.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized to update this recipe' });
        }

        recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Вернуть обновленный объект
            runValidators: true // Проверить данные по схеме
        });

        res.json(recipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Удалить рецепт
// @route   DELETE /api/resource/:id
// @access  Private
exports.deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        // Проверка прав доступа
        if (recipe.author.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await recipe.deleteOne();
        res.json({ message: 'Recipe removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const axios = require('axios'); // Не забудь установить: npm install axios

// @desc    Получить случайный рецепт из внешнего API
// @route   GET /api/recipes/random
// @access  Public
exports.getRandomRecipe = async (req, res) => {
    try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
        const meal = response.data.meals[0];
        
        // Форматируем ответ под наш стиль
        res.json({
            title: meal.strMeal,
            category: meal.strCategory,
            instructions: meal.strInstructions,
            image: meal.strMealThumb,
            source: meal.strSource
        });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении внешнего рецепта' });
    }
};