require('dotenv').config();

const {
  NODE_ENV = 'production',
  JWT_SECRET = 'some-secret-key',
  PORT = 3000,
  CONNECT = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;

const config = {
  NODE_ENV,
  JWT_SECRET,
  PORT,
  CONNECT,
};

module.exports = config;
