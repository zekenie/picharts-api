var assert = function(message, statement) {
  if(!statement) {
    console.log(statement)
    throw new Error(message)
  }
}

var m = require('../models')

m.sequelize.drop()
  .then(function() {
    return m.sequelize.sync({force: true})
  })
  .then(require('./patient')(m))
  .then(function() {
    return m
      .Patient
      .findAll({ include: m.Visit })
  })
  .then(function(z) {
    assert('there is one zeke', z.length === 1)
    z = z[0]
    assert('zeke has a name', z.firstName === 'zeke')
    assert('zeke has one visit', z.Visits.length === 1)
  }, console.warn)
  .then(require('./role')(m))
  .then(function() {
    return m.Role
      .findAll({
        include: m.Permission
      })
  })
  .then(function(roles) {
    assert('there are two roles', roles.length === 2)
    var role = roles[0]
    assert('the role has two permissions', role.Permissions.length === 2)
  })
  .then(function() {
    return m.User.create({})
  })
  .then(function(u) {
    return u.authorize('super user').then(function() {
      return u
    })
  })
  .then(function(u) {
    return u.can('enroll', 'patient')
  })
  .then(function(res) {
    assert('user can do correct role', res)
  })
  .then(function() {
    return m.User.create({})
  })
  .then(function(u) {
    return u.can('foo', 'bar')
  })
  .then(function(res) {
    assert('shouldnt be able to do a thing you cant do', !res)
  })
