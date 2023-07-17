import { useLocation } from 'react-router-dom'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import Modal from 'react-modal'

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
      <h2 className="subtitle">
        Round by round statistics - statIndex
        <HiOutlineInformationCircle onClick={() => setShowInfo(!showInfo)} />
      </h2>
      {showFigure ? <LineChart /> : <RadarChart />}
      <div className="graph-button-container">
        <button
          className="graph-button"
          onClick={() => setShowFigure(!showFigure)}
        >
          {showFigure ? 'Per Par Breakdown' : 'Round by Round Progression'}
        </button>
      </div>

      <Modal
        isOpen={showInfo}
        onRequestClose={() => setShowInfo(false)}
        className="info-modal"
        contentLabel="Info Modal"
      >
        <h1>statIndex info</h1>
        <p></p>
        <p>
          statIndex is a number created by calculating what percentile a golfer
          will be in for a given stat, based on the range from an average 36+
          handicapper to the best on the best PGA tour player in that category.
        </p>
        {showFigure ? (
          <p>
            Each round takes into account the difficulty of the course. This is
            the slope rating and will modifier the GIR, FIR and putt stats to
            adjust to a given challenge. i.e. if you are playing on a
            &apos;harder course&apos;, FIR & GIR will adjust to be higher, and
            putts will be lower. The amount adjusted is based on the given
            difficulty of each course
          </p>
        ) : (
          <>
            <p>
              The size of each data set on the radar graph gives a statIndex
              approximation of the efficency in each length hole
            </p>
            <p>
              Essentially, the larger a given dataset the more effective the
              golfer is overall at that par. The four points of each set
              directly correlate to a different component of the hole, greens,
              fairways, putts, and net score.
            </p>
          </>
        )}
      </Modal>
    </div>
  )
}

export default Charts
