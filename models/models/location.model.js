module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Location', {
    name: DataTypes.STRING,
    lat: DataTypes.INTEGER,
    lng: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(m) {
        m.Location.hasMany(m.Visit)
        m.Location.hasMany(m.Patient)
      }
    }
  })
}