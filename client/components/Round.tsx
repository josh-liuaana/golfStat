import { FERound } from '../../models/types'
import { useAppSelector } from '../hooks/redux'

function Round() {
  const round = useAppSelector((state) => state.round) as FERound

  if (Object.keys(round).length === 0) {
    return null
  }

  const roundLength = round.gross.length
  const adjustedParPerHole = round.parPerHole.slice(0, roundLength)
  const adjustedPar = adjustedParPerHole.reduce((total, gross) => total + gross)

  const fairwaysHit = round.fir.filter((fairway) => fairway === true).length
  const fairwayHoles = adjustedParPerHole.filter((hole) => hole > 3).length
  const greensHit = round.gir.filter((green) => green === true).length
  const totalPutts = round.putts.reduce((total, putts) => total + putts)
  const avgPutts = (totalPutts / round.putts.length).toFixed(1)
  const roundScore = round.gross.reduce((total, gross) => total + gross)

  return (
    <main className="single-round-container">
      <div className="round-title-block">
        <h1>
          {round.courseName} {roundLength === 9 && ' - (9)'}
        </h1>
        <p>{round.createdAt}</p>
      </div>
      <div className="round-stats">
        <span className="round-stat-cat-container">
          <p className="round-stat-cat">Gross:</p>{' '}
          <p className="round-stat-value">{roundScore}</p>
        </span>

        <span className="round-stat-cat-container">
          <p className="round-stat-cat">Score:</p>
          <p className="round-stat-value">
            {roundScore - adjustedPar > 0 && '+'}
            {roundScore - adjustedPar}
          </p>
        </span>

        <span className="round-stat-cat-container">
          <p className="round-stat-cat">Total putts: </p>
          <p className="round-stat-value">{totalPutts}</p>
        </span>

        <span className="round-stat-cat-container">
          <p className="round-stat-cat">Average putts per hole: </p>
          <p className="round-stat-value">{avgPutts}</p>
        </span>

        <div className="round-stat-gir-fir-container">
          <p className="round-stat-cat">Fairways in regulation: </p>
          <p className="round-stat-value">
            {fairwaysHit} / {fairwayHoles}
          </p>
          <p className="round-stat-value">
            {((fairwaysHit / fairwayHoles) * 100).toFixed(1)}%
          </p>
        </div>

        <div className="round-stat-gir-fir-container">
          <p className="round-stat-cat">Greens in regulation: </p>
          <p className="round-stat-value">
            {greensHit} / {round.gir.length}
          </p>
          <p className="round-stat-value">
            {((greensHit / round.gir.length) * 100).toFixed(1)}%
          </p>
        </div>
      </div>
    </main>
  )
}

export default Round
