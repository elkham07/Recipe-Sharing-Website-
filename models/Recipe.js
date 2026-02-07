const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a recipe title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    ingredients: {
        type: [String], // Массив строк
        required: [true, 'Please add at least one ingredient']
    },
    instructions: {
        type: String,
        required: [true, 'Please add preparation instructions']
    },
    cookingTime: {
        type: Number,
        required: [true, 'Please add cooking time in minutes']
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'], // Ограничиваем выбор
        default: 'Medium'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Связь с коллекцией User (п. 2 требований)
        required: true
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Recipe', recipeSchema);