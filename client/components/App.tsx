import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import * as actions from '../actions/rounds'
import * as courseActions from '../actions/courses'
import { useAppDispatch } from '../hooks/redux'
import Nav from './Nav'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(actions.getRounds())
    dispatch(courseActions.getCourses())
  }, [dispatch])

  return (
    <>
      <Nav />
      <Outlet />
    </>
  )
}

export default App
