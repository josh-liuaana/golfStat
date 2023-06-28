import request from 'superagent'
import { CurrentData } from '../../models/types'

export async function fetchRounds() {
  const res = await request.get('/api/v1/rounds')
  return res.body
}

export async function fetchSingleRound(id: number) {
  const res = await request.get(`/api/v1/rounds/${id}`)
  return res.body
}

export async function postRound(currentRoundData: CurrentData) {
  const res = await request.post(`/api/v1/rounds`).send(currentRoundData)
  return res.body
}
