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
    // associations can be defined here
  }
  return GraduationType
}
