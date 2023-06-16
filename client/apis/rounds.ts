import request from 'superagent'

export async function fetchRounds() {
  const res = await request.get('/api/v1/rounds')
  return res.body
}

export async function fetchSingleRound(id: number) {
  const res = await request.get(`/api/v1/rounds/${id}`)
  return res.body
}
