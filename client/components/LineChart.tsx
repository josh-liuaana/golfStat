import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useLocation } from 'react-router-dom'
import { FERound } from '../../models/types'
import * as indexFuncs from '../../models/stat-index'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface ChartData {
  putts: number[]
  gir: number[]
  fir: number[]
  toPar: number[]
  date: string[]
}

function LineChart() {
  const { state } = useLocation()

  const puttArr = indexFuncs.puttIndexPerRound(state.allRounds)
  const regArr = indexFuncs.regIndexPerRound(state.allRounds)

  const allRounds = state.allRounds as FERound[]
  const chartData = {
    putts: [],
    gir: [],
    fir: [],
    toPar: [],
    date: [],
  } as ChartData

  allRounds.map((round) => {
    const gross = round.gross.reduce((total, score) => total + score)
    chartData.toPar.push(gross - round.par)

    chartData.date.push(round.createdAt)
  })

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Round by round stats - statIndex value',
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'statIndex ( % )',
        },
        min: 20,
        max: 100,
        position: 'left' as const,
      },
      y1: {
        title: {
          display: true,
          text: 'to par',
        },
        min: 0,
        max: 24,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  }

  const labels = chartData.date

  const data = {
    labels,
    datasets: [
      {
        label: 'Putts',
        data: puttArr,
        borderColor: 'rgba(175, 10, 10, 0.8)',
        backgroundColor: 'rgba(175, 10, 10, 0.8)',
        yAxisID: 'y',
        borderWidth: 1.5,
        tension: 0.1,
      },
      {
        label: 'Green in reg',
        data: regArr.moddedGirArr,
        borderColor: 'rgba(10, 100, 20, 0.8)',
        backgroundColor: 'rgba(10, 100, 20, 0.8)',
        yAxisID: 'y',
        borderWidth: 1.5,
        tension: 0.1,
      },
      {
        label: 'Fairways in reg',
        data: regArr.moddedFirArr,
        borderColor: 'rgba(10, 10, 180, 0.8',
        backgroundColor: 'rgba(10, 10, 180, 0.8',
        yAxisID: 'y',
        borderWidth: 1.5,
        tension: 0.1,
      },
      {
        label: 'To par',
        data: chartData.toPar,
        borderColor: 'black',
        backgroundColor: 'black',
        yAxisID: 'y1',
        borderWidth: 1.5,
        tension: 0.1,
      },
    ],
  }

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  )
}

export default LineChart
