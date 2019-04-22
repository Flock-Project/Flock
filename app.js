const express = require('express');
const hbs = require('hbs');
const indexRouter = require('./routes/index.route')
const registerRouter = require('./routes/register.route')
const loginRouter = require('./routes/login.route')
const app = express();
const passport=require("passport")

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


app.use('/', indexRouter)
app.use('/register', registerRouter)
app.use('/login', loginRouter)


app.listen(3000, () => console.log('Check'));