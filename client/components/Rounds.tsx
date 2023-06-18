import { NavLink } from "react-router-dom"
import { FERound } from "../../models/types"
import { useAppSelector, useAppDispatch } from "../hooks/redux"
import * as actions from "../actions/rounds"

function Rounds() {
  const dispatch = useAppDispatch()
  const rounds = useAppSelector(state => state.rounds) as FERound[]

  const handleClick = (id: number) => {
    dispatch(actions.getSingleRound(id))
  }

  return (
    <>
      <p>Rounds Component</p>
      {rounds.map((round) => (
        <div key={round.id}>
          <NavLink to={`/round/${round.id}`}>
            <button onClick={() => handleClick(round.id)}>{round.golferName} @ {round.courseName} - {round.createdAt}</button>
          </NavLink>
        </div>
      ))}
    </>
  )
}

export default Rounds