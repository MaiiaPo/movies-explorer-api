/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const config = {
  jwtSecret: NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
  connectDbString: 'mongodb://localhost:27017/bitfilmsdb',
};

module.exports = config;
