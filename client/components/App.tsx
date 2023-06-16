import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import * as actions from '../actions/rounds'
import { useAppDispatch } from "../hooks/redux"

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(actions.getRounds())
  }, [])
  
  return (
    <>
      <p>App Component</p>
      <Outlet />
    </>
  )
}

export default App