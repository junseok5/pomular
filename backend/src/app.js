const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const history = require('connect-history-api-fallback');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const staticFileMiddleware = express.static(path.join(__dirname, 'public'))

app.use(staticFileMiddleware);
app.use(
  history ({
    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
    verbos: true,
    disableDotRule: true
  })
);
app.use(staticFileMiddleware);

/************* DB ***************/

db.connect()
const yvideo = require('./rest/yvideo')(app);
const subtitle = require('./rest/subtitle')(app);

module.exports = app;
