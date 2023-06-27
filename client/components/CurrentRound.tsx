import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { CourseState, CurrentData } from '../../models/types'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { setScore } from '../actions/courses'

// TODO Figure out checkbox bug
// * Will it require additional function? cant un-check

function CurrentRound() {
  const dispatch = useAppDispatch()
  const courses = useAppSelector((state) => state.courses) as CourseState
  const [currentHole, setCurrentHole] = useState(1)
  const [previousDisabled, setPreviousDisabled] = useState(false)
  const [nextDisabled, setNextDisabled] = useState(false)
  const [currentData, setCurrentData] = useState({} as CurrentData)

  const holeLength = courses.current.currentData.gross.length

  const handleClick = (input: number) => {
    setCurrentHole(currentHole + input)
    dispatch(setScore(currentData))
  }

  useEffect(() => {
    setCurrentData(courses.current.currentData)
  }, [courses])

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
    console.log(evt.target.name, evt.target.value)
    const newArr = currentData[
      evt.target.name as keyof typeof currentData
    ] as number[]
    newArr[currentHole - 1] = Number(evt.target.value)
    console.log('newArr', newArr)

    setCurrentData({
      ...currentData,
      [evt.target.name]: newArr,
    })
  }

  const handleBoolChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newArr = currentData[
      evt.target.name as keyof typeof currentData
    ] as boolean[]
    console.log(evt.target.value)
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

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault()
    console.log('WILL ADD TO THE DB WHEN COURSE IS DONE', currentData)
  }

  return (
    <>
      <p>YOU ARE PLAYING AT {courses.current.course.name}</p>
      <p>YOU ARE PLAYING {holeLength} HOLES</p>
      <button onClick={() => handleClick(-1)} disabled={previousDisabled}>
        Previous Hole
      </button>
      <p>Current hole: {currentHole}</p>
      <button onClick={() => handleClick(1)} disabled={nextDisabled}>
        Next Hole
      </button>
      <form onSubmit={handleSubmit}>
        {/* CHECKBOX GIR FIR */}
        <label htmlFor="fir">Fairway</label>
        <input
          id="fir"
          name="fir"
          type="checkbox"
          onChange={handleBoolChange}
          checked={courses.current.currentData.fir[currentHole - 1]} // true/false
        />
        <label htmlFor="gir">Green</label>
        <input
          id="gir"
          name="gir"
          type="checkbox"
          onChange={handleBoolChange}
          checked={courses.current.currentData.gir[currentHole - 1]}
        />
        {/* NUMBER PUTTS GROSS */}
        <label htmlFor="gross">Gross</label>
        <input
          id="gross"
          name="gross"
          type="number"
          onChange={handleNumChange}
          value={courses.current.currentData.gross[currentHole - 1]}
        />
        <label htmlFor="putts">Putts</label>
        <input
          id="putts"
          name="putts"
          type="number"
          onChange={handleNumChange}
          value={courses.current.currentData.putts[currentHole - 1]}
        />
        {currentHole === holeLength && <input type="submit" value="Submit" />}
        <input type="reset" value="Reset" />
      </form>
      <button onClick={() => console.log(currentData)}>
        CHECK CURRENT SCOREBOARD
      </button>
    </>
  )
}

export default CurrentRound
