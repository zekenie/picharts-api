module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Visit', {
    
  }, {
    classMethods: {
      asociate: function(m) {
        m.Visit.belongsTo(m.Patient)
      }
    }
  })
}