import { CurrentData, FECourse } from '../../models/types'
import { useAppSelector } from '../hooks/redux'

interface Data {
  current: {
    course: FECourse
    currentData: CurrentData
  }
}

function PostRound() {
  const round = useAppSelector((state) => state.courses) as Data
  const currentData = round.current.currentData

  console.log(currentData)

  const roundLength = currentData.gross.length
  const adjustedParPerHole = round.current.course.parPerHole.slice(
    0,
    roundLength
  )
  const adjustedPar = adjustedParPerHole.reduce((total, gross) => total + gross)

  const fairwaysHit = currentData.fir.filter(
    (fairway) => fairway === true
  ).length
  const fairwayHoles = adjustedParPerHole.filter((hole) => hole > 3).length
  const greensHit = currentData.gir.filter((green) => green === true).length
  const totalPutts = currentData.putts.reduce((total, putts) => total + putts)
  const avgPutts = (totalPutts / currentData.putts.length).toFixed(1)
  const gross = currentData.gross.reduce((total, gross) => total + gross)

  return (
    <main className="single-round-container">
      <div className="round-title-block">
        <h1>{round.current.course.name}</h1>
      </div>
      <div className="round-stats">
        <span className="round-stat-cat-container">
          <p className="round-stat-cat">Gross:</p>{' '}
          <p className="round-stat-value">{gross}</p>
        </span>

        <span className="round-stat-cat-container">
          <p className="round-stat-cat">Score:</p>
          <p className="round-stat-value">
            {gross - adjustedPar > 0 && '+'}
            {gross - adjustedPar}
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
            {greensHit} / {currentData.gir.length}
          </p>
          <p className="round-stat-value">
            {((greensHit / currentData.gir.length) * 100).toFixed(1)}%
          </p>
        </div>
      </div>
    </main>
  )
}

export default PostRound
