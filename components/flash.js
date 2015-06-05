var models = require('../../picharts-data')

module.exports = {
  addFlashMiddleware: function(req, res, next) {
    res.flash = function(msg, type) {
      type = type || 'info'
      return req.user.addNotification({ message: msg, type: type })
    }

    res.flashAndRedirect = function(msg, uri) {
      res.flash(msg)
        .then(function() {
          res.redirect(uri)
        })
    }
  }
}
