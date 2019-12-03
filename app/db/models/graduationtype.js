'use strict'
module.exports = (sequelize, DataTypes) => {
  const GraduationType = sequelize.define(
    'GraduationType',
    {
      name: {
        type: DataTypes.STRING
      }
    },
    {}
  )
  GraduationType.associate = function(models) {
    GraduationType.hasMany(models.Course, { foreignKey: 'graduationType_id' })
  }
  return GraduationType
}
