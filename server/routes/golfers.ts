import express from 'express'
import * as db from '../db/db'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const golferArr = await db.getAllGolfers()
    res.json(golferArr)
  } catch (err) {
    console.error('Route error', err)
    res.sendStatus(500)
  }
})

export default router
