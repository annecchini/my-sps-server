'use strict'
module.exports = (sequelize, DataTypes) => {
  const Process = sequelize.define(
    'Process',
    {
      identifier: {
        type: DataTypes.STRING,
        allowNull: false
      },
      year: {
        type: DataTypes.STRING(4),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(4),
        allowNull: false
      },
      visible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    { paranoid: true }
  )
  Process.associate = function(models) {
    Process.belongsTo(models.Course, { foreignKey: 'course_id' })
  }
  return Process
}
