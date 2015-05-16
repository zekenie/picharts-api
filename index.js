var express = require('express')
var app = express()
module.exports = app

var config = require('./config')
var models = require('../picharts-data')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
app.use(logger('dev'))

app.use(cookieParser(config.cookieSecret))

app.get('/dbtest', function(req,res) {
	models.User.findAll().then(function(users) {
		res.json(users)
	})
})


app.listen(process.env.NODE_ENV || 8080)
