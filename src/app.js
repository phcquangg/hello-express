const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

require('./databases/init.mongodb')

app.get('/', (res, req, next) => {
  next();
})

module.exports = app;
