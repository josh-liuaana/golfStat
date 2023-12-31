import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AddRound from './AddRound'

function Home() {
  const [showRoundSelection, setShowRoundSelection] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="home-container">
      <h1>Josh Liua&apos;ana</h1>
      <img src="../../images/golf.png" alt="gS logo" />
      {showRoundSelection ? (
        <>
          <AddRound />
          <button
            className="course-form-button back-button"
            onClick={() => setShowRoundSelection(false)}
          >
            Cancel
          </button>
        </>
      ) : (
        <div className="button-container">
          <div className="top-buttons-container">
            <button
              className="home-buttons stat-buttons"
              onClick={() => navigate('/rounds')}
            >
              Playing History
            </button>
            <button
              className="home-buttons stat-buttons"
              onClick={() => navigate('/statistics')}
            >
              Statistics
            </button>
          </div>
          <div>
            <button
              className="home-buttons new-round-button"
              onClick={() => setShowRoundSelection(!showRoundSelection)}
            >
              New Round
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
