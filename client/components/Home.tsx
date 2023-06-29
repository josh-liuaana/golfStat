import { useState } from 'react'

import AddRound from './AddRound'

function Home() {
  const [showRoundSelection, setShowRoundSelection] = useState(false)
  return (
    <div className="home-container">
      <h1>Josh Liua&apos;ana</h1>
      <img src="../../images/golf.png" alt="gS logo" />
      {showRoundSelection ? (
        <>
          <button onClick={() => setShowRoundSelection(!showRoundSelection)}>
            Go back
          </button>
          <AddRound />
        </>
      ) : (
        <div className="button-container">
          <div className="top-buttons-container">
            <button
              className="home-buttons stat-buttons"
              onClick={() => alert('navigate to round history page')}
            >
              Playing History
            </button>
            <button
              className="home-buttons stat-buttons"
              onClick={() => alert('navigate to statistics page')}
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
