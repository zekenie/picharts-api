module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ReadingTypeChoice', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(m) {
        m.ReadingTypeChoice.belongsTo(m.ReadingType)
      }
    }
  })
}