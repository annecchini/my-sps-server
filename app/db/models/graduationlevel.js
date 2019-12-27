'use strict'
module.exports = (sequelize, DataTypes) => {
  const GraduationLevel = sequelize.define(
    'GraduationLevel',
    {
      name: {
        type: DataTypes.STRING
      }
    },
    {}
  )
  GraduationLevel.associate = function(models) {}
  return GraduationLevel
}