module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Notification', {
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      default: 'info'
    }
  }, {
   classMethods: {
      associate: function(m) {
        m.Notification.belongsTo(m.User)
      }
    }
  })
}
