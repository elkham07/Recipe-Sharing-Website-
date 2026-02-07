const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a username'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true, // Не дает регистрировать дважды один email
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6, // Минимальная длина для безопасности
        select: false // При запросах пароль не будет приходить по умолчанию
    }
}, { 
    timestamps: true // Автоматически создаст поля createdAt и updatedAt
});

module.exports = mongoose.model('User', userSchema);