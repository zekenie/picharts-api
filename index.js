var express = require('express')
var app = express()
var models = require('../picharts-data')


app.get('/dbtest', function(req,res) {
	models.User.findAll().then(function(users) {
		res.json(users)
	})
})


app.use(function(req, res) {
	res.send('woooot')
})

app.listen(process.env.NODE_ENV || 8080)
