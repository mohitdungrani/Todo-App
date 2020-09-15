var express = require('express');
var todoControler = require('./controlers/todoControler');

var app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));

todoControler(app);

app.listen(3000);
console.log('You are listening to port 3000');