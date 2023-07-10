import { useLocation } from 'react-router-dom'

import LineChart from './LineChart'

function Charts() {
  const { state } = useLocation()

  return (
    <>
      <h1>{state.allRounds[0].golferName}</h1>
      <LineChart />
    </>
  )
}

export default Charts
