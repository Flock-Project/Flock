const express = require('express');
const hbs = require('hbs');
const indexRouter = require('./routes/index.route')
const registerRouter = require('./routes/register.route')
const loginRouter = require('./routes/login.route')
const app = express();
const passport=require("passport")

require('./config/db.config');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter)
app.use('/register', registerRouter)
app.use('/login', loginRouter)

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