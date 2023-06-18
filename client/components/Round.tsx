import { FERound } from "../../models/types"
import { useAppSelector } from "../hooks/redux"

function Round() {
  const round = useAppSelector(state => state.round) as FERound

  if (Object.keys(round).length === 0) {
    return null
  }

  const fairwaysHit = round.fir.filter((fairway) => fairway === true).length
  const fairwayHoles = round.parPerHole.filter((hole) => hole > 3).length
  const greensHit = round.gir.filter((green) => green === true).length
  const totalPutts = round.putts.reduce((total, putts) => total + putts)
  const avgPutts = (totalPutts/round.putts.length).toFixed(1)
  const roundScore = round.gross.reduce((total, gross) => total + gross)

  return (
    <main>
      <p>Round Component</p>
      <p>{round.createdAt}</p>
      <p>{round.golferName} - {round.courseName}</p>
      <p>Gross: ({roundScore})</p>
      <p>Score: +{roundScore - round.par} </p>
      <p>Total putts: {totalPutts}</p>
      <p>Average putts per hole: {avgPutts}</p>
      <p>FIR: {fairwaysHit} / {fairwayHoles}</p>
      <p>{(fairwaysHit/fairwayHoles * 100).toFixed(1)}%</p>
      <p>GIR: {greensHit} / {round.gir.length}</p>
      <p>{(greensHit/round.gir.length * 100).toFixed(1)}%</p>
    </main>
  )
}

export default Round