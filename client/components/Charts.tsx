import { useLocation } from 'react-router-dom'

import LineChart from './LineChart'
import RadarChart from './RadarChart'

function Charts() {
  const { state } = useLocation()

  return (
    <>
      <h1>{state.allRounds[0].golferName}</h1>
      <LineChart />
      <RadarChart />
    </>
  )
}

export default Charts
