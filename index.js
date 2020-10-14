const express = require('express')
const routes = require('./routes')
const path = require('path')
const bodyParser = require('body-parser')

const db = require('./config/db')
require('dotenv').config({path: 'variables.env'});

require('./models/Libros')

db.sync()
    .then(() => console.log('Conectado al Servidor'))
    .catch(error => console.log(error));


const app = express()

app.use(express.static('public'))

app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, './views'));
app.locals.moment = require('moment');


app.use('/',routes())



const host = process.env.HOST || '0.0.0.0'
var port = process.env.PORT || 8080;


var server=app.listen(port,function() {
    console.log("app running on port 8080"); });