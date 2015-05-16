var jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')
var models = require('../../picharts-data')
var config = require('../config')

module.exports = {
  signJwt: function(u) {
    return jwt.sign({ id: u.id }, config.secret, { expiresInMinutes: 60*24 })
  },
  isAuthenticated: [
    function(req, res, next) {
      if(req.headers.Authorization) return next()
      req.headers.Authorization = 'Bearer ' + req.cookies.jwt
    },
    expressJwt,
    function(req, res, next) {
      models.User.find(req.user.id)
        .then(function(user) {
          if(!user) {
            var err = new Error('failed to deserialize user from id')
            err.status = 500
            throw err
          }
          req.user = user
          next()
        })
        .catch(next)
    }
  ],
  can: function(verb, subject) {
    req.user.can(verb, subject)
      .then(function(result) {
        if(result) return next()
        var err = new Error('unauthorized')
        err.status = 401
        throw err
      })
      .catch(next)
  }
}
