var express = require('express')
var app = express()
module.exports = app

var config = require('./config')
var models = require('./models')
var swig = require('swig')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var sass = require('node-sass-middleware')
var bodyParser = require('body-parser')
var settings= require('./settings')

swig.setDefaults({ cache: false })
app.engine('html', swig.renderFile)
app.set('views', __dirname + '/views')
app.set('view engine', 'html')
app.set('view cache', false);
swig.setDefaults({ cache: false });



app.use(logger('dev'))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(sass({
  src: __dirname + '/assets',
  dest: __dirname + '/public'
}))

app.use(express.static(__dirname + '/public'))
app.use(cookieParser(config.cookieSecret))

app.use(function(req, res, next) {
  res.locals.settings = settings.getAll()
  req.settings = settings.getAll()
  next()
})

var auth = require('./components/auth')

app.use('/users', require('./api/users'))

app.use(auth.isAuthenticated)

app.get('/', function(req,res,next) {
  res.render('index', {
  })
})


app.use('/locations', require('./api/locations'))

app.use('/patients', require('./api/patients'))

app.use(function(req, res, next) {
  var err = new Error('not found')
  err.status = 404
  next(err)
})

app.use(function(err, req, res, next) {
  console.log(err)
  console.log(err.stack)
  res.status(err.status || 500).send(err)
})

app.listen(config.port, function() {
  console.log('app listening on', config.port)
})
