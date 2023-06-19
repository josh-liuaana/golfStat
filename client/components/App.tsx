import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import * as actions from '../actions/rounds'
import * as courseActions from '../actions/courses'
import { useAppDispatch } from "../hooks/redux"

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(actions.getRounds())
    dispatch(courseActions.getCourses())
  }, [])
  
  return (
    <>
      <p>App Component</p>
      <Outlet />
    </>
  )
}

export default App