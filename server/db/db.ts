import db from './connection'
import * as data from '../../models/data-conversion'

export async function getAllRounds() {
  const rounds = await db('rounds').select(
    'id',
    'course_id as courseId',
    'golfer_id as golferId',
    'putts',
    'gir',
    'fir',
    'gross',
    'created_at as createdAt'
  )
  rounds.map((round) => {
    round.putts = data.stringToNumArr(round.putts)
    round.gir = data.stringToBoolArr(round.gir)
    round.fir = data.stringToBoolArr(round.fir)
    round.gross = data.stringToNumArr(round.gross)
  })
  return rounds
}

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
