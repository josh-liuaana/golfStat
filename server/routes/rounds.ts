import express from 'express'
import * as rounds from '../db/rounds'
import * as data from '../../models/data-conversion'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const roundsArr = await rounds.getAllRounds()
    res.json(roundsArr)
  } catch (err) {
    console.error('Route error', err)
    res.sendStatus(500)
  }
})

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const round = await rounds.getRoundById(id)
    res.json(round)
  } catch (err) {
    console.error('Route error', err)
    res.sendStatus(500)
  }
})

router.post('/', async (req, res) => {
  const round = {
    course_id: req.body.courseId,
    golfer_id: req.body.golferId,
    putts: data.arrToString(req.body.putts),
    gir: data.arrToString(req.body.gir),
    fir: data.arrToString(req.body.fir),
    gross: data.arrToString(req.body.gross),
  }
  try {
    const result = await rounds.addRound(round)
    res.json(result)
  } catch (err) {
    console.error('Route error', err)
    res.sendStatus(500)
  }
})

export default router
