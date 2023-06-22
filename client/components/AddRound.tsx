import { FormEvent, useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import Select, { SingleValue } from 'react-select'
import {
  RoundSelectOptions,
  CourseState,
  HoleSelectOptions,
} from '../../models/types'
import { useNavigate } from 'react-router-dom'
import * as action from '../actions/courses'

function AddRound() {
  const navigateTo = useNavigate()
  const dispatch = useAppDispatch()
  const [selectedCourse, setSelectedCourse] = useState('')
  const [selectedHoles, setSelectedHoles] = useState(0)
  const courses = useAppSelector((state) => state.courses) as CourseState

  const options = [] as RoundSelectOptions[]
  useEffect(() => {
    courses.all &&
      courses.all.map((course) => {
        options.push({ value: course.name, label: course.name, id: course.id })
      })
  }, [options])

  const handleCourse = (course: SingleValue<RoundSelectOptions>) => {
    if (!course) return null
    setSelectedCourse(course.value)
  }

  const HandleHoles = (holes: SingleValue<HoleSelectOptions>) => {
    if (!holes) return null
    setSelectedHoles(holes.value)
  }

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault()
    const newCourse = await courses.all.find((course) => {
      return course.name === selectedCourse
    })
    const currentRoundData = {
      putts: Array(selectedHoles).fill(0),
      gir: Array(selectedHoles).fill(false),
      fir: Array(selectedHoles).fill(false),
      gross: Array(selectedHoles).fill(0),
    }
    newCourse && dispatch(action.setCurrentCourse(newCourse, currentRoundData))
    navigateTo('/current')
  }

  return (
    <>
      <p>AddRound Component</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="course">New Round</label>
        <Select
          id="course"
          required={true}
          options={options}
          isSearchable={true}
          isClearable={true}
          onChange={(course) => handleCourse(course)}
        />
        <label htmlFor="holes">Holes played:</label>
        <Select
          id="holes"
          required={true}
          options={[
            { value: 9, label: 9 },
            { value: 18, label: 18 },
          ]}
          onChange={(holes) => HandleHoles(holes)}
        />
        <input type="submit" value="Choose course" />
      </form>
    </>
  )
}

export default AddRound
