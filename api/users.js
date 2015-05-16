var express = require('express')
var router = express.Router()
var models = require('../../picharts-data')
module.exports = router
var config = require('../config')

var auth = require('../components/auth')


router.post('/', function(req, res, next) {
  models.User
    .create(req.body)
    .then(function(user) {
      res.cookie('jwt', auth.signJwt(user))
      res.redirect('/')
    })
    .catch(next)
})

router.get('/login', function(req, res, next) {
  res.render('login')
})

router.post('/login', function(req, res, next) {
  models.User
    .findAll({ where: { req.body.email } })
    .then(function(user) {
      if(!user) {
        return res.flashAndRedirect('/users/login', 'Incorrect email or password', 'warning')
      }
      res.cookie('jwt', auth.signJwt(user))
      res.redirect('/')
    })
    .catch(next)
})

router.use(auth.isAuthenticated)

router.get('/logout', function(req, res, next) {
  res.clearCookies('jwt')
  res.redirect('/users/login')
})
