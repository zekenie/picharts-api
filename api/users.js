var express = require('express')
var router = express.Router()
var models = require('../../picharts-data')
module.exports = router
var jwt = require('jsonwebtoken')
var config = require('../config')
var createJwt = function(u) {
  return jwt.sign({_id: u._id}, config.secret, { expiresInMinutes: 60*24 })
}

router.post('/', function(req, res, next) {
  models.User
    .create(req.body)
    .then(function(user) {
      res.sendStatus(200)
    })
    .catch(next)
})
