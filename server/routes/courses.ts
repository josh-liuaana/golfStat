import express from 'express'
import * as db from '../db/db'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const courseArr = await db.getAllCourses()
    res.json(courseArr)
  } catch (err) {
    console.error('Route error', err)
    res.sendStatus(500)
  }
})

export default router
