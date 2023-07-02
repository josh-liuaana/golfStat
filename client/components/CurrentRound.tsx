import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import { CourseState, CurrentData } from '../../models/types'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { setScore } from '../actions/courses'
import { addRound } from '../actions/rounds'

// TODO Figure out checkbox bug - will probs need a function to toggle
// TODO Putt and gross is required field
// TODO Running totals - adjust score so it doesnt do per hole but based on score
// will probably need to splice to where a zero is

function CurrentRound() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const courses = useAppSelector((state) => state.courses) as CourseState
  const [currentHole, setCurrentHole] = useState(1)
  const [previousDisabled, setPreviousDisabled] = useState(false)
  const [nextDisabled, setNextDisabled] = useState(false)
  const [currentData, setCurrentData] = useState({} as CurrentData)
  const [currentGross, setCurrentGross] = useState(0)
  const [currentScore, setCurrentScore] = useState(0)
  const [currentPutts, setCurrentPutts] = useState(0)

  const holeLength = courses.current.currentData.gross.length

  const handleClick = (input: number) => {
    if (
      currentData.gross[currentHole - 1] === 0 ||
      currentData.putts[currentHole - 1] === 0
    ) {
      alert('Gross and putt cant be zero')
      return null
    }
    setCurrentHole(currentHole + input)
    dispatch(setScore(courses.current.course, currentData))
  }

  useEffect(() => {
    setCurrentData(courses.current.currentData)
    setCurrentGross(
      courses.current.currentData.gross.reduce((total, gross) => total + gross)
    )
    const currentPar = courses.current.course.parPerHole.slice(
      0,
      currentHole - 1
    )
    const putts =
      courses.current.currentData.putts.reduce(
        (total, putts) => total + putts
      ) /
      (currentHole - 1)

    if (currentPar.length > 0) {
      setCurrentScore(
        courses.current.currentData.gross.reduce(
          (total, gross) => total + gross
        ) - currentPar.reduce((total, gross) => total + gross)
      )
      setCurrentPutts(Number(putts.toFixed(1)))
    }
  }, [courses, currentHole])

  useEffect(() => {
    if (currentHole === 1) {
      setPreviousDisabled(true)
    } else if (currentHole === holeLength) {
      setNextDisabled(true)
    } else {
      setNextDisabled(false)
      setPreviousDisabled(false)
    }
  }, [currentHole, holeLength])

  const handleNumChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newArr = currentData[
      evt.target.name as keyof typeof currentData
    ] as number[]
    newArr[currentHole - 1] = Number(evt.target.value)
    setCurrentData({
      ...currentData,
      [evt.target.name]: newArr,
    })
  }

  const handleBoolChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newArr = currentData[
      evt.target.name as keyof typeof currentData
    ] as boolean[]
    if (evt.target.value === 'on') {
      newArr[currentHole - 1] = true
    } else {
      newArr[currentHole - 1] = false
    }

    setCurrentData({
      ...currentData,
      [evt.target.name]: newArr,
    })
  }

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault()
    await dispatch(
      addRound({
        ...currentData,
        courseId: courses.current.course.id,
        golferId: '7fe67614-2735-4b0c-8de5-f8cf3c303397',
      })
    )
    navigate(`/rounds`)
  }

  return (
    <>
      <div className="round-information">
        <p>
          {courses.current.course.name} ({holeLength})
        </p>
        <p>Gross: {currentGross}</p>
        <p>
          Score: {currentScore > 0 && '+'}
          {currentScore}
        </p>
        <p>Putt avg: {currentPutts}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-checkboxes">
          <div className="checkbox-container">
            <label className="form-label" htmlFor="fir">
              Fairway
            </label>
            <input
              id="fir"
              name="fir"
              type="checkbox"
              disabled={
                courses.current.course.parPerHole[currentHole - 1] === 3
              }
              onChange={handleBoolChange}
              checked={courses.current.currentData.fir[currentHole - 1]}
            />
          </div>

          <div className="checkbox-container">
            <label className="form-label" htmlFor="gir">
              Green
            </label>
            <input
              id="gir"
              name="gir"
              type="checkbox"
              onChange={handleBoolChange}
              checked={courses.current.currentData.gir[currentHole - 1]}
            />
          </div>
        </div>

        <div className="hole-navigation">
          <button
            className="hole-nav-buttons"
            onClick={() => handleClick(-1)}
            disabled={previousDisabled}
            type="button"
          >
            <FaArrowLeft />
          </button>
          <div className="hole-information">
            <h2>Hole: {currentHole}</h2>
            <h3>Par: {courses.current.course.parPerHole[currentHole - 1]}</h3>
          </div>
          <button
            className="hole-nav-buttons"
            onClick={() => handleClick(1)}
            disabled={nextDisabled}
            type="button"
          >
            <FaArrowRight />
          </button>
        </div>

        <div className="form-number-inputs">
          <div className="input-container">
            <label className="form-label" htmlFor="gross">
              Gross
            </label>
            <input
              id="gross"
              name="gross"
              type="number"
              onChange={handleNumChange}
              value={courses.current.currentData.gross[currentHole - 1]}
            />
          </div>

          <div className="input-container">
            <label className="form-label" htmlFor="putts">
              Putts
            </label>
            <input
              id="putts"
              name="putts"
              type="number"
              onChange={handleNumChange}
              value={courses.current.currentData.putts[currentHole - 1]}
            />
          </div>
        </div>

        <div className="end-button-container">
          <button className="end-button reset-button" type="reset">
            Reset
          </button>
          <button
            className={
              currentHole === holeLength
                ? 'end-button submit-button'
                : 'end-button submit-button-disabled'
            }
            type="submit"
            disabled={!(currentHole === holeLength)}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  )
}

export default CurrentRound
