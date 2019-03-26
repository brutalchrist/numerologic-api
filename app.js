const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const biorhythmsRouter = require('./routes/biorhythms');
const slackAuthRouter = require('./routes/slack/auth');
const slackBiorhythmsRouter = require('./routes/slack/biorhythms');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/biorhythms', biorhythmsRouter);
app.use('/slack/auth', slackAuthRouter);
app.use('/slack/biorhythms', slackBiorhythmsRouter);

module.exports = app;
