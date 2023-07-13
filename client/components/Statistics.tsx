import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'
import { FERound, PerParData } from '../../models/types'
import * as dataFuncs from '../../models/statistics'

interface Data extends PerParData {
  totalParFourFive: number
}

function Statistics() {
  const navigate = useNavigate()
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

  if (Object.keys(data).length === 0) {
    return null
  }

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
          <p className="overall-cat">Avg Putts per 18 holes:</p>
          <p>{((data.totalPutts / data.totalHoles) * 18).toFixed(1)}</p>
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
          <p className="overall-cat"> Avg to par (per hole):</p>
          <p>
            {data.toPar > 0 ? '+' : data.toPar < 0 ? '-' : ''}
            {data && data.toPar.toFixed(2)}
          </p>
        </span>
        <span>
          <p className="overall-cat"> Avg to par (per 18):</p>
          <p>
            {data.toPar > 0 ? '+' : data.toPar < 0 ? '-' : ''}
            {(data.toPar * 18).toFixed(1)}
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
        <button
          onClick={() =>
            navigate('/chart', {
              replace: false,
              state: {
                allRounds,
                data,
                parThreeData,
                parFourData,
                parFiveData,
              },
            })
          }
          className="graph-button"
        >
          Graphs
        </button>
      </div>
    </div>
  )
}

export default Statistics
