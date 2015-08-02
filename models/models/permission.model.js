module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Permission', {
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    verb: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(m) {
        m.Permission.belongsToMany(m.Role, {
          through: 'PermissionRole'
        })
      }
    }
  })
}