module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Reading', {
    
  }, {
    classMethods: {
      associate: function(m) {
        m.Reading.belongsTo(m.Visit)
        m.Reading.belongsTo(m.Patient, { through: m.Visit})
      }
    }
  })
}