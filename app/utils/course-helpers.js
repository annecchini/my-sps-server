'use strict'

const findCourseIdByProcessId = async (process_id, db) => {
  const process = await db.Process.findByPk(process_id)
  const course = await process.getCourse()
  return course ? course.id : null
}

module.exports = { findCourseIdByProcessId }
