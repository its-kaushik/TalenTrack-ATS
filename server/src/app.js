const express = require('express');
const cors = require('cors');

const apiV1 = require('./routes/apiV1');
const {
  logErrorMiddleware,
  returnError,
} = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/v1', apiV1);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Workinmg Fine',
  });
});

app.use(logErrorMiddleware);
app.use(returnError);

module.exports = app;
