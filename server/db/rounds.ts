import db from './connection'
import { stringToBoolArr, stringToNumArr } from '../../models/data-conversion'

export async function getAllRounds() {
  const data = await db('rounds')
    .join('golfers', 'golfers.id', 'golfer_id')
    .join('courses', 'courses.id', 'course_id')
    .select(
      'rounds.id as id',
      'rounds.course_id as courseId',
      'courses.name as courseName',
      'rounds.golfer_id as golferId',
      'golfers.name as golferName',
      'putts',
      'gir',
      'fir',
      'gross',
      'created_at as createdAt',
      'courses.par_per_hole as parPerHole',
      'par'
    )

  data.map((round) => {
    round.putts = stringToNumArr(round.putts)
    round.gir = stringToBoolArr(round.gir)
    round.fir = stringToBoolArr(round.fir)
    round.gross = stringToNumArr(round.gross)
    round.parPerHole = stringToNumArr(round.parPerHole)
  })

  return data
}
export async function getRoundById(id: number) {
  const data = await db('rounds')
    .join('golfers', 'golfers.id', 'golfer_id')
    .join('courses', 'courses.id', 'course_id')
    .select(
      'rounds.id as id',
      'rounds.course_id as courseId',
      'courses.name as courseName',
      'rounds.golfer_id as golferId',
      'golfers.name as golferName',
      'putts',
      'gir',
      'fir',
      'gross',
      'created_at as createdAt',
      'courses.par_per_hole as parPerHole',
      'par'
    )
    .where('rounds.id', id)
    .first()

  data.putts = stringToNumArr(data.putts)
  data.gir = stringToBoolArr(data.gir)
  data.fir = stringToBoolArr(data.fir)
  data.gross = stringToNumArr(data.gross)
  data.parPerHole = stringToNumArr(data.parPerHole)

  return data
}
