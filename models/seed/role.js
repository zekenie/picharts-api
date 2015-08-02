module.exports = function(m) {
  return function() {
    return m.Role.create({
        name: 'super user'
      })
      .then(function(r) {
        return r.authorize('enroll','patient')
      })
      .then(function(r) {
        return r.authorize('report', 'patient')
      })
      .then(function() {
        return m.Role.create({
          name: 'not allowed'
        })
      })
      .then(function(r) {
        return r.authorize('foo', 'bar')
      })
  }
}