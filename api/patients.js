var express = require('express')
var router = express.Router()
var models = require('picharts-data')
module.exports = router
var config = require('../config')

router.get('/', function (req, res, next) {
  models.Patient
    .findAll({ where: {LocationId: req.settings.locationId }})
    .then(function(patients) {
      res.render('patients/index', {
        patients: patients
      })      
    })
    .catch(next)
})

router.get('/new', function(req, res, next) {
  res.render('patients/new', {
    method: 'post',
    action: '/patients'
  })
})

router.post('/', function(req, res, next) {
  req.body.LocationId = req.settings.locationId
  console.log(req.body)
  models.Patient
    .create(req.body)
    .then(function(patient) {
      res.flashAndRedirect('Patient created', '/patients')
    })
    .catch(next)
})