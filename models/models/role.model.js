module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    instanceMethods:  {
      authorize: function authroize(verb, subject) {
        var self = this
        return sequelize
          .models
          .Permission
          .findOrCreate({
            where: {
              subject: subject,
              verb: verb
            },
            defaults: {
              subject: subject,
              verb: verb
            }
          })
          .spread(function(permission, created) {
            return self.addPermission(permission)
          })
          .then(function() {
            return self
          })
      }
    },
    classMethods: {
      associate: function(m) {
        m.Role.belongsTo(m.User)
        m.Role.belongsToMany(m.Permission, {
          through: 'PermissionRole'
        })
      }
    }
  })
}