import db from './connection'
import * as data from '../../models/data-conversion'

export async function getAllCourses() {
  const courses = await db('courses').select(
    'id',
    'name',
    'distance',
    'slope',
    'par',
    'par_per_hole as parPerHole'
  )
  courses.map((course) => {
    course.parPerHole = data.stringToNumArr(course.parPerHole)
  })
  return courses
}

export async function getCourseById(id: number) {
  const course = await db('courses')
    .select(
      'id',
      'name',
      'distance',
      'slope',
      'par',
      'par_per_hole as parPerHole'
    )
    .where({ id })
    .first()
  course.parPerHole = data.stringToNumArr(course.parPerHole)
  return course
}
