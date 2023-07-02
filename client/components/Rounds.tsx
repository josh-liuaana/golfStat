import { NavLink } from 'react-router-dom'
import { FERound } from '../../models/types'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import * as actions from '../actions/rounds'

function Rounds() {
  const dispatch = useAppDispatch()
  const rounds = useAppSelector((state) => state.rounds) as FERound[]

  const handleClick = (id: number) => {
    dispatch(actions.getSingleRound(id))
  }

  return (
    <>
      <h2 className="previous-rounds-title">Previous Rounds</h2>
      <div className="round-container">
        {rounds.map((round) => (
          <div key={round.id}>
            <NavLink to={`/round/${round.id}`}>
              <button
                className="round-button"
                onClick={() => handleClick(round.id)}
              >
                {round.createdAt} - {round.courseName}
              </button>
            </NavLink>
          </div>
        ))}
      </div>
    </>
  )
}

export default Rounds
