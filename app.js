/* eslint-disable */
// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');
const config = require('./config');

mongoose.connect(config.connectDbString);

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());

router.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
