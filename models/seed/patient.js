module.exports = function(m) {
  return function() {
    return m
      .Patient.create({
        firstName: 'zeke',
        middleName: 'alexander',
        lastName: 'nierenberg',
        dob: new Date()
      })
      .then(function(z) {
        return z.createVisit()
      })
  }
}