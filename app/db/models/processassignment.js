'use strict'
module.exports = (sequelize, DataTypes) => {
  const ProcessAssignment = sequelize.define(
    'ProcessAssignment',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      }
    },
    { paranoid: true, timestamps: true }
  )

  ProcessAssignment.associate = function(models) {
    ProcessAssignment.belongsTo(models.Process, { foreignKey: 'process_id' })
    ProcessAssignment.belongsTo(models.Assignment, { foreignKey: 'assignment_id' })
  }

  ProcessAssignment.prototype.toJSON = function() {
    let values = Object.assign({}, this.get())
    delete values.deletedAt
    return values
  }

  return ProcessAssignment
}
