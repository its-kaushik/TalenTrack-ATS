const express = require('express');
const cors = require('cors');
const path = require('path');

const apiV1 = require('./routes/apiV1');
const {
  logErrorMiddleware,
  returnError,
} = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/v1', apiV1);

app.get('/health', (req, res) => {
  res.status(200).json({
    message: 'Server is up and running boii..',
  });
});

app.use(logErrorMiddleware);
app.use(returnError);

module.exports = app;
