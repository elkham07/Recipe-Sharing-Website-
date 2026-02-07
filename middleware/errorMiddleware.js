const errorHandler = (err, req, res, next) => {
    // Если статус код все еще 200 (ОК), но мы в обработчике ошибок — ставим 500
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
        message: err.message,
        // Показываем стек ошибки только если мы в режиме разработки
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { errorHandler };