var Promise = require('bluebird')
var bcrypt = require('bcrypt')
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    phone: {
      type: DataTypes.STRING,
      validations: {
        notNull: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validations: {
        isEmail: true
      }
    },
    name: {
      type: DataTypes.STRING,
      validations: {
        notNull: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validations: {
        notNull: true
      }
    },
  }, {
    hooks: {
      beforeCreate: function(u, options) {
        return u.hashPassword()
      },
      beforeUpdate: function(u, options) {
        if(!u.changed('password')) return Promise.resolve(u)
        return u.hashPassword()
          .then(function() {
            return u
          })
      }
    },
    instanceMethods: {
      hashPassword: function() {
        if(!this.isNewRecord && !this.changed('password')) return Promise.reject("password not modified. can't salt and hash")
        var u = this
        return new Promise(function(resolve, reject) {
          bcrypt.genSalt(10, function(err, salt) {
            if(err) return reject(err)
            console.log(u, salt)
            bcrypt.hash(u.password, salt, function(err, hash) {
              if(err) return reject(err)
              u.password = hash
              resolve([salt, hash])
            })
          })
        })
      },

      checkPassword: function(p) {
        var self = this
        return new Promise(function(resolve, reject) {
          bcrypt.compare(p, self.password, function(err, result) {
            if(err) return reject(err)
            resolve(result)
          })
        })
      },

      authorize: function(role) {
        var self = this
        return sequelize.models.Role.find({
          where: {
            name: role
          }
        })
        .then(function(role) {
          if(!role) return
          return self.addRole(role)
        })
      },

      can: function(verb, subject) {
        return this
          .getRoles({
            include: [sequelize.models.Permission]
          })
          .then(function(roles) {
            for(var i = 0; i < roles.length; i++) {
              for(var j = 0; j < roles[i].Permissions.length; j++) {
                var permission = roles[i].Permissions[j]
                if(permission.subject === subject && permission.verb === verb) return true
              }
            }
            return false
          })
      }
    },
    classMethods: {
      associate: function(m) {
        m.User.hasMany(m.Role)
        m.User.hasMany(m.Notification)
      }
    }
  })
}
