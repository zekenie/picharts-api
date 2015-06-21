var jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')
var models = require('picharts-data')
var config = require('../config')

module.exports = {
  signJwt: function(u) {
    return jwt.sign({ id: u.id }, config.jwtSecret, { expiresInMinutes: 60*24 })
  },
  isAuthenticated: [
    function(req, res, next) {
      if(req.headers.authorization) return next()
      req.headers.authorization = 'Bearer ' + req.cookies.jwt
      next()
    },
    expressJwt({ secret: config.jwtSecret }),
    function(req, res, next) {
      models.User.find({ where: {id: req.user.id}, include: [models.Notification] })
        .then(function(user) {
          if(!user) {
            var err = new Error('failed to deserialize user from id')
            err.status = 401
            throw err
          }
          req.user = user
          res.locals.user = user
          next()
        })
        .catch(next)
    },
    function(req, res, next) {
      require('./flash').addFlashMiddleware(req, res, next)
      next()
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
