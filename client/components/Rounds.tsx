import { FERound } from "../../models/types"
import { useAppSelector } from "../hooks/redux"

function Rounds() {
  const rounds = useAppSelector(state => state.rounds) as FERound[]
  return (
    <>
      <p>Rounds Component</p>
      {rounds.map((round) => (
        <div key={round.id}>
          <p>{round.golferName} @ {round.courseName} - {round.createdAt}</p>
        </div>
      ))}
    </>
  )
}

export default Rounds