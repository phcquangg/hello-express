const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});

const app = express();
const demo_route = require('./routes');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());

require('./databases/init.mongodb');

app.use('/', demo_route)

module.exports = app;
