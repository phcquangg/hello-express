"use strict";

const config = {
  dev: {
    app: {
      port: process.env.APP_PORT || 1221,
    },
    db: {
      port: process.env.DB_DEV_PORT || '27017',
      name: process.env.DB_DEV_NAME || '',
      host: process.env.DB_DEV_HOST || 'localhost',
      user_name: process.env.DB_DEV_USERNAME,
      password: process.env.DB_DEV_PWD
    },
  },
  prod: {
    app: {
      port: process.env.APP_PORT || 1221,
    },
    db: {
      port: process.env.DB_PROD_PORT || 'localhost',
      name: process.env.DB_PROD_NAME,
      host: process.env.DB_PROD_HOST
    },
  },
};

module.exports = config[env];
