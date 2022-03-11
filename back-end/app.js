var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//variables d'environnement
const dotenv = require('dotenv').config()
//mongodb
const mongoose = require('mongoose');

//les routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var toileRouter = require('./routes/toileRoutes')

//body parser pour les requetes
const bodyParser = require('body-parser');

//creer l application
var app = express();

//body parser configuration
// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// connect to mongodb
mongoose.connect(process.env.DATABASE,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
  console.log('connextion mongodb ok')
})
.catch(function(err){
  console.log('connexion mongodb echoué',err)
  throw err
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//définir ou sont les fichiers statics
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/toiles', toileRouter)

// catch 404 and forward to error handler
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

module.exports = app;
