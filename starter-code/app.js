const express = require('express');
const hbs = require('hbs');
const indexRouter = require('./routes/index.routes')
const registerRouter = require('./routes/register.routes')
const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


app.use('/', indexRouter)
app.use('/register', registerRouter)


app.listen(3000, () => console.log('Check'));