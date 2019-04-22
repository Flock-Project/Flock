const express = require('express');
const hbs = require('hbs');
const indexRouter = require('./routes/index.routes')
const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


app.use('/', indexRouter)


app.listen(3000, () => console.log('Check'));