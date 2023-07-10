import db from './connection'
import { stringToBoolArr, stringToNumArr } from '../../models/data-conversion'
import { BERound } from '../../models/types'

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
      'par',
      'courses.slope'
    )
    .orderBy('createdAt', 'desc')

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

export function addRound(round: BERound) {
  return db('rounds')
    .insert(round)
    .returning([
      'id',
      'course_id as courseId',
      'golfer_id as golferId',
      'putts',
      'gross',
      'fir',
      'gir',
      'created_at as createdAt',
    ])
}
