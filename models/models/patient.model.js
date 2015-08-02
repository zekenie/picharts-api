module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Patient', {
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    active: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(m) {
        m.Patient.hasMany(m.Visit)
        m.Patient.hasMany(m.Reading, { through: m.Visit })
        m.Patient.belongsTo(m.Location)
      }
    },
    instanceMethods: {
      fullName: function() {
        return [this.firstName, this.middleName, this.lastName].join(' ');
      }
    }
  })
}