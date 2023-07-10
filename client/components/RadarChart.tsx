import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'
import { useLocation } from 'react-router-dom'
import * as indexFuncs from '../../models/stat-index'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

function RadarChart() {
  const { state } = useLocation()

  const parData = indexFuncs.perParIndex(
    state.parThreeData,
    state.parFourData,
    state.parFiveData
  )

  const data = {
    labels: ['GIR', 'FIR', 'Putts', 'To par'],
    datasets: [
      {
        label: 'Par 3',
        data: parData.moddedParThreeData,
        borderColor: 'rgba(175, 10, 10, 0.8)',
        backgroundColor: 'rgba(175, 10, 10, 0.3)',
        borderWidth: 1,
      },
      {
        label: 'Par 4',
        data: parData.moddedParFourData,
        borderColor: 'rgba(10, 100, 20, 0.8)',
        backgroundColor: 'rgba(10, 100, 20, 0.3)',
        borderWidth: 1,
      },
      {
        label: 'Par 5',
        data: parData.moddedParFiveData,
        borderColor: 'rgba(10, 10, 180, 0.8',
        backgroundColor: 'rgba(10, 10, 180, 0.2',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    scales: {
      r: {
        min: 0,
        max: 100,
      },
    },
  }

  return <Radar data={data} options={options} />
}

export default RadarChart
