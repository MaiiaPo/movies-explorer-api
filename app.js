const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const config = require('./config');
const limiter = require('./utils/limiter');

const errorsHandler = require('./middlewares/errors');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const NotFoundError = require('./errors/not-found-err');

mongoose.connect(config.connectDbString);

const app = express();

app.use(bodyParser.json());
app.use(cors);
app.use(requestLogger);

router.use(express.json());
app.use(limiter);
app.use(router);

app.use((req, res, next) => next(new NotFoundError('Несуществующая страница')));

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(config.port, () => {
  console.log(`App listening on port ${config.port}`);
});
