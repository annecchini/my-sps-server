'use strict'
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    'UserRole',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      course_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'Courses',
          key: 'id'
        }
      }
    },
    { paranoid: true, timestamps: true }
  )

  UserRole.associate = function(models) {
    UserRole.belongsTo(models.User, { foreignKey: 'user_id' })
    UserRole.belongsTo(models.Role, { foreignKey: 'role_id' })
    UserRole.belongsTo(models.Course, { foreignKey: 'course_id' })
  }

  UserRole.prototype.toJSON = function() {
    let values = Object.assign({}, this.get())
    delete values.deletedAt
    return values
  }

  return UserRole
}
