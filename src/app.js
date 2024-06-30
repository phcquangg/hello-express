const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

app.get('/', (res, req, next) => {
  next();
})

module.exports = app;
