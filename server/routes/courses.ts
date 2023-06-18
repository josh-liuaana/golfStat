import express from 'express'
import * as courses from '../db/courses'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const courseArr = await courses.getAllCourses()
    res.json(courseArr)
  } catch (err) {
    console.error('Route error', err)
    res.sendStatus(500)
  }
})

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const course = await courses.getCourseById(id)
    res.json(course)
  } catch (err) {
    console.error('Route error', err)
    res.sendStatus(500)
  }
})

export default router
