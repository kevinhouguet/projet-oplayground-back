module.exports = {
  errorHandler(err, req, res, next) {
    let { message } = err;

    console.log(err);

    if (err.code === '23505') {
      message = 'One or all data already exists';
    }

    if (err.code === '23503') {
      message = 'This data is bind with other datas. Thanks to delete other datas before delete this one';
    }

    const status = err.httpCode || 500;
    res.status(status).json({ error: message });
  },
};
