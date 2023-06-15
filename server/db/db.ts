import db from './connection'
import * as data from '../../models/data-conversion'

export async function getAllGolfers() {
  return await db('golfers').select(
    'id',
    'name',
    'handicap_index as handicapIdx'
  )
}

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
