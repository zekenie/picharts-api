var express = require('express')
var router = express.Router()
var models = require('../models')
module.exports = router
var config = require('../config')
var auth = require('../components/auth')
var settings = require('../settings')
router.use(auth.isAuthenticated)

router.get('/new', function(req, res, next) {
  res.render('locations/new', {
    method: 'post',
    action: '/locations'
  })
})

router.post('/', function(req, res, next) {
  models.Location
    .create(req.body)
    .then(function(location) {
      res.flashAndRedirect('Location created', '/locations/' + location.id)
    })
    .catch(next)
})

router.get('/:id', function(req, res, next) {
  res.render('locations/view')
})

router.get('/:id/edit', function(req, res, next) {
  res.render('locations/edit', {
    method: 'post',
    action: '/locations/' + req.location.id
  })
})

router.get('/:id/makeCurrent', function(req, res, next) {
  settings.set('locationId', Number(req.params.id))
    .then(function() {
      res.redirect('/locations')
    }, next)
})

router.post('/:id', function(req, res, next) {
  for(var key in req.body) {
    req.location[key] = req.body[key]
  }
  req.location
    .save()
    .then(function(location) {
      console.log('location after save', location)
      res.flashAndRedirect('Location updated', '/locations/' + location.id)
    })
    .catch(next)
})

router.get('/', function(req, res, next) {
  models.Location
    .findAll()
    .then(function(locations) {
      res.render('locations/index', {
        locations: locations
      })
    })
    .catch(next)
})

router.param('id', function(req, res, next, id) {
  models.Location
    .find(id)
    .then(function(location) {
      if(!location) {
        var err = new Error('not found')
        err.status = 404
        throw err
      }
      req.location = location
      res.locals.location = location
      next()
    })
    .catch(next)
})
