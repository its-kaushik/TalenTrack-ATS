const express = require('express');
const cors = require('cors');
const path = require('path');

const apiV1 = require('./routes/apiV1');
const {
  logErrorMiddleware,
  returnError,
} = require('./middlewares/errorHandler');
const { responseHandler } = require('./utils/responseHandler');

const app = express();

//TODO: JOI / Express Validation
//TODO: ngnix - limits on file
//

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'data')));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/v1', apiV1);

app.get('/health', (req, res) => {
  responseHandler(res, null, 'API is working fine');
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use(logErrorMiddleware);
app.use(returnError);

module.exports = app;
