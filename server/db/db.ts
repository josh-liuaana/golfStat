import db from './connection'

export async function getAllGolfers() {
  return await db('golfers').select(
    'id',
    'name',
    'handicap_index as handicapIdx'
  )
}
