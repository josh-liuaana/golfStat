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
    const roundLength = round.gross.length
    const adjustedParPerHole = round.parPerHole.slice(0, roundLength)
    const adjustedPar = adjustedParPerHole.reduce((total, par) => total + par)

    const gross = round.gross.reduce((total, score) => total + score)
    if (roundLength === 9) {
      chartData.toPar.push((gross - adjustedPar) * 2)
    } else {
      chartData.toPar.push(gross - adjustedPar)
    }

    chartData.date.push(round.createdAt)
  })

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: 'Round by round stats - statIndex value',
      },
    },
    scales: {
      x: {
        reverse: true,
      },
      y: {
        title: {
          display: true,
          text: 'statIndex ( % )',
        },
        reverse: true,
        min: 0,
        suggestedMax: 100,
        position: 'left' as const,
      },
      y1: {
        title: {
          display: true,
          text: '18 hole to par',
        },
        min: 0,
        suggestedMax: 24,
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
        tension: 0.3,
        hidden: true,
      },
      {
        label: 'GIR',
        data: regArr.moddedGirArr,
        borderColor: 'rgba(10, 100, 20, 0.8)',
        backgroundColor: 'rgba(10, 100, 20, 0.8)',
        yAxisID: 'y',
        borderWidth: 1.5,
        tension: 0.3,
      },
      {
        label: 'FIR',
        data: regArr.moddedFirArr,
        borderColor: 'rgba(10, 10, 180, 0.8)',
        backgroundColor: 'rgba(10, 10, 180, 0.8)',
        yAxisID: 'y',
        borderWidth: 1.5,
        tension: 0.3,
      },
      {
        label: 'Net',
        data: chartData.toPar,
        borderColor: 'black',
        backgroundColor: 'black',
        yAxisID: 'y1',
        borderWidth: 1.5,
        tension: 0.3,
      },
    ],
  }

  const secondaryData = {
    labels,
    datasets: [
      {
        label: 'Putts',
        data: puttArr,
        borderColor: 'rgba(175, 10, 10, 0.8)',
        backgroundColor: 'rgba(175, 10, 10, 0.8)',
        yAxisID: 'y',
        borderWidth: 1.5,
        tension: 0.3,
      },
      {
        label: 'GIR',
        data: regArr.moddedGirArr,
        borderColor: 'rgba(10, 100, 20, 0.8)',
        backgroundColor: 'rgba(10, 100, 20, 0.8)',
        yAxisID: 'y',
        borderWidth: 1.5,
        tension: 0.3,
        hidden: true,
      },
      {
        label: 'FIR',
        data: regArr.moddedFirArr,
        borderColor: 'rgba(10, 10, 180, 0.8)',
        backgroundColor: 'rgba(10, 10, 180, 0.8)',
        yAxisID: 'y',
        borderWidth: 1.5,
        tension: 0.3,
        hidden: true,
      },
      {
        label: 'Net',
        data: chartData.toPar,
        borderColor: 'black',
        backgroundColor: 'black',
        yAxisID: 'y1',
        borderWidth: 1.5,
        tension: 0.3,
      },
    ],
  }

  return (
    <div className="chart-container">
      <div className="line-charts">
        <Line options={options} data={data} />
      </div>
      <div className="line-charts">
        <Line options={options} data={secondaryData} />
      </div>
    </div>
  )
}

export default LineChart
