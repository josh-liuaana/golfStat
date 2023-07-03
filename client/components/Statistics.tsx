import { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/redux'
import { FERound } from '../../models/types'
import * as dataFuncs from '../../models/statistics'

interface PerParData {
  totalPutts: number
  totalHoles: number
  totalFairways: number
  totalGreens: number
  toPar: number
}

interface Data extends PerParData {
  totalParFourFive: number
}

function Statistics() {
  const allRounds = useAppSelector((state) => state.rounds) as FERound[]

  const [data, setData] = useState({} as Data)
  const [parThreeData, setParThreeData] = useState({} as PerParData)
  const [parFourData, setParFourData] = useState({} as PerParData)
  const [parFiveData, setParFiveData] = useState({} as PerParData)

  const [statsPerPar, setStatsPerPar] = useState(3)

  useEffect(() => {
    setData(dataFuncs.statCalculator(allRounds))
    setParThreeData(dataFuncs.perParStats(allRounds, 3))
    setParFourData(dataFuncs.perParStats(allRounds, 4))
    setParFiveData(dataFuncs.perParStats(allRounds, 5))
  }, [allRounds])

  return (
    <div className="statistics-container">
      <h1>Statistics</h1>
      <div className="overall-statistics-container">
        <span>
          <p className="overall-cat">Total holes played:</p>
          <p>{data.totalHoles}</p>
        </span>
        <span>
          <p className="overall-cat">Avg Putts:</p>
          <p>{(data.totalPutts / data.totalHoles).toFixed(1)}</p>
        </span>
        <span>
          <p className="overall-cat">Avg Putts per round:</p>
          <p>{(data.totalPutts / allRounds.length).toFixed(1)}</p>
        </span>
        <span>
          <p className="overall-cat">Fairways in regulation:</p>
          <p>
            {data.totalFairways} / {data.totalParFourFive} -{'  '}
            {((data.totalFairways / data.totalParFourFive) * 100).toFixed(1)}%
          </p>
        </span>
        <span>
          <p className="overall-cat">Greens in regulation:</p>
          <p>
            {data.totalGreens} / {data.totalHoles} -{'  '}
            {((data.totalGreens / data.totalHoles) * 100).toFixed(1)}%
          </p>
        </span>
        <span>
          <p className="overall-cat"> Avg to par:</p>
          <p>
            {data.toPar > 0 ? '+' : data.toPar < 0 ? '-' : ''}
            {data.toPar}
          </p>
        </span>
      </div>

      <div className="stats-button-container">
        <button className="par-button" onClick={() => setStatsPerPar(3)}>
          PAR 3
        </button>
        <button className="par-button" onClick={() => setStatsPerPar(4)}>
          PAR 4
        </button>
        <button className="par-button" onClick={() => setStatsPerPar(5)}>
          PAR 5
        </button>
      </div>

      <div className="par-statistics-container">
        <h2>Par {statsPerPar} stats</h2>
        <div>
          <span>
            <p className="par-cat">Avg Putts:</p>
            <p>
              {statsPerPar === 3
                ? (parThreeData.totalPutts / parThreeData.totalHoles).toFixed(1)
                : statsPerPar === 4
                ? (parFourData.totalPutts / parFourData.totalHoles).toFixed(1)
                : (parFiveData.totalPutts / parFiveData.totalHoles).toFixed(1)}
            </p>
          </span>
          <span>
            <p className="par-cat">Greens in reg:</p>
            <p>
              {statsPerPar === 3
                ? (
                    (parThreeData.totalGreens / parThreeData.totalHoles) *
                    100
                  ).toFixed(1)
                : statsPerPar === 4
                ? (
                    (parFourData.totalGreens / parFourData.totalHoles) *
                    100
                  ).toFixed(1)
                : (
                    (parFiveData.totalGreens / parFiveData.totalHoles) *
                    100
                  ).toFixed(1)}
              %
            </p>
          </span>
          {statsPerPar === 3 ? null : (
            <>
              <span>
                <p className="par-cat">Fairways in reg:</p>

                <p>
                  {statsPerPar === 4
                    ? (
                        (parFourData.totalFairways / parFourData.totalHoles) *
                        100
                      ).toFixed(1)
                    : (
                        (parFiveData.totalFairways / parFiveData.totalHoles) *
                        100
                      ).toFixed(1)}
                  %
                </p>
              </span>
            </>
          )}
          <span>
            <p className="par-cat">Avg to par:</p>
            <p>
              {statsPerPar === 3
                ? parThreeData.toPar > 0
                  ? `+${parThreeData.toPar}`
                  : parThreeData.toPar < 0
                  ? `-${parThreeData.toPar}`
                  : 'E'
                : statsPerPar === 4
                ? parFourData.toPar > 0
                  ? `+${parFourData.toPar}`
                  : parFourData.toPar < 0
                  ? `-${parFourData.toPar}`
                  : 'E'
                : parFiveData.toPar > 0
                ? `+${parFiveData.toPar}`
                : parFiveData.toPar < 0
                ? `-${parFiveData.toPar}`
                : 'E'}
            </p>
          </span>
        </div>
      </div>

      <div>
        <button className="graph-button" disabled={true}>
          Graphs
        </button>
      </div>
    </div>
  )
}

export default Statistics
