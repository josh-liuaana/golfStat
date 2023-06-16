import request from 'superagent'

export async function fetchRounds() {
  const res = await request.get('/api/v1/rounds')
  return res.body
}
