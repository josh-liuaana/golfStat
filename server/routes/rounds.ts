import express from 'express'
import * as rounds from '../db/rounds'

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

export default router
