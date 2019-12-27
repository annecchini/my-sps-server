'use strict'
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    'Course',
    {
      name: { type: DataTypes.STRING },
      description: { type: DataTypes.STRING }
    },
    { paranoid: true }
  )
  Course.associate = function(models) {
    Course.belongsTo(models.GraduationLevel, { foreignKey: 'graduationLevel_id' })
  }
  return Course
}
