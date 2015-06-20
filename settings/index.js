var Promise = require('bluebird')
var fs = require('fs')
var settingsPath = __dirname + '/settings.json'
var settings = {}

var loadSettings = function() {
  try {
    settings = JSON.parse(fs.readFileSync(settingsPath).toString())
  } catch(e) {
    console.log('failed to load settings file, writing one')
    try {
      console.log(e)
      fs.writeFileSync(settingsPath, '{}')
    } catch(e) {
      console.log(e)
      console.log('failed to write settings file')
      process.exit(1)
    }
  }
}

loadSettings()

var saveSettings = function(cb) {
  fs.writeFile(settingsPath, JSON.stringify(settings), cb)
}

module.exports = {
  get: function(key) {
    return settings[key]
  },
  getAll: function() {
    return settings
  },
  set: function(k, v) {
    settings[k] = v
    return new Promise(function(resolve, reject) {
      saveSettings(function(err, result) {
        if(err) return reject(err)
        resolve(result)
      })
    })
  }
}
