var express = require('express')
var app = express()
var models = require('picharts-data')


app.get('/dbtest', function(req,res) {
	models.User.findAll().then(function(users) {
		res.json(users)
	})
})


app.use(function(req, res) {
	res.send('woooo')
})

app.listen(80)