function responseHandler(res, data, message = 'success', statusCode = 200) {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

module.exports = {
  responseHandler,
};
