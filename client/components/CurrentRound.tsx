import { FormEvent, useState } from 'react'
import { CourseState } from '../../models/types'
import { useAppSelector } from '../hooks/redux'

function CurrentRound() {
  const courses = useAppSelector((state) => state.courses) as CourseState

  return (
    <>
      <p>CurrentRound Component</p>
      <p>YOU ARE PLAYING AT {courses.current.course.name}</p>
      <p>YOU ARE PLAYING {courses.current.currentData.putts.length} HOLES</p>
    </>
  )
}

export default CurrentRound
