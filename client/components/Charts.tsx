import { useLocation } from 'react-router-dom'

import LineChart from './LineChart'
import RadarChart from './RadarChart'
import { useState } from 'react'

function Charts() {
  const { state } = useLocation()
  const [showFigure, setShowFigure] = useState(true)
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div className="charts-container">
      <h1>{state.allRounds[0].golferName}</h1>
      {showFigure ? <LineChart /> : <RadarChart />}
      <button onClick={() => setShowInfo(!showInfo)}>Information</button>
      <button onClick={() => setShowFigure(!showFigure)}>
        {showFigure ? 'Per Par Breakdown' : 'Round by Round Progression'}
      </button>
      <dialog open={showInfo} id="info">
        <section>
          <h1>Information</h1>
          <p>
            Stats are calculated based on a scale from the average golfer to the
            best on the PGA tour. This will create a statIndex value,
            essentially a percentile placing you on the scale for poor to
            excellent
          </p>
          <button onClick={() => setShowInfo(false)}> close </button>
        </section>
      </dialog>
    </div>
  )
}

export default Charts
