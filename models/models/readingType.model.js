module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ReadingType', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(m) {
        m.ReadingType.hasMany(m.Reading)
        m.ReadingType.hasMany(m.ReadingTypeChoice)
      }
    }
  })
}