require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const logger = require('morgan');
const passport=require("passport")

const indexRouter = require('./routes/index.route')
const authRouter = require('./routes/auth.route')

require('./config/db.config');
require('./config/hbs.config');
const session = require('./config/session.config')
require('./config/passport.config')

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) =>{
    res.locals.path = req.path;
    res.locals.session = req.user;
    next();
})

app.use('/', indexRouter)
app.use('/', authRouter)


app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
// set locals, only providing error in development
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
res.status(err.status || 500);
res.render('error');
});
  

app.listen(3000, () => console.log('Check'));

module.exports = app;