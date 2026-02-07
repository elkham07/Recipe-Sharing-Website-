const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Проверяем наличие заголовка Authorization и начинается ли он с Bearer
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Извлекаем токен из строки "Bearer <TOKEN>"
            token = req.headers.authorization.split(' ')[1];

            // Декодируем токен
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Получаем пользователя из базы БЕЗ пароля и передаем дальше в запрос
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Переходим к следующей функции (контроллеру)
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };